import { get, shouldReadFromNextGen } from "../utils/httpUtils";
import { formatUrlParams } from "../utils/paramsUtils";
import { snakeToCamel } from "../utils/utils";

export const fedBulkDowloadsResolver = async (root, args, context, info) => {
  const nextGenEnabled = await shouldReadFromNextGen(context);
  /*----------------- Next Gen -----------------*/
  // TODO: get actual user Id
  if (nextGenEnabled) {
    const getAllBulkDownloadsQuery = `query GetAllBulkDownloadsQuery {
    workflowRuns(
    where: {
     workflowVersion: {workflow: {name: {_eq: "bulk-download"}}},
     ownerUserId: {_eq: 412},
     deletedAt: {_is_null: true}
  }
    orderBy: {createdAt: desc}
  ) {
    id
    status
    rawInputsJson
    createdAt
    workflowVersion {
      id
    }
    ownerUserId
  }
  }`;
    const allBulkDownloadsResp = await get({
      args,
      context,
      serviceType: "workflows",
      customQuery: getAllBulkDownloadsQuery,
    });
    console.log("allBulkDownloadsResp", allBulkDownloadsResp);

    //Return all workflow runs in this format

    // If the workflow run is successful, get the download link
    // Add the URL to the workflow run object
    const succeededWorkflowRunIds =
      allBulkDownloadsResp?.data?.workflowRuns?.filter(
        bulkDownload => bulkDownload.status === "SUCCEEDED",
      );
    console.log("succeededWorkflowRunIds", succeededWorkflowRunIds);
    const downloadLinkQuery = `query GetDownloadURL {
      bulkDownloads(where: {producingRunId: {_in: [${succeededWorkflowRunIds?.map(id => `"${id}"`)}]}}) {
        file {
          downloadLink {
            url
          }
        }
        producingRunId
      }
    }`;
    const downloadLinksResp = await get({
      args,
      context,
      serviceType: "entities",
      customQuery: downloadLinkQuery,
    });
    console.log("downloadLinksResp", downloadLinksResp);

    // MERGE THE NEXT GEN DOWNLOADS WITH THE RAILS DOWNLOADS
    // Concat and sort by createdAt (but efficiently?)
    // return {
    //   id: id.toString(), // in NextGen this will be the workflowRun id because that is the only place that has info about failed and in progress bulk download workflows
    //   startedAt: created_at,
    //   status: statusDictionary[status] || "UNKNOWN",
    //   downloadType: download_type (coming from the workflow run rawInputsJson),
    //   ownerUserId: user_id,
    //   fileSize: output_file_size,
    //   url,
    //   analysisCount: length of the edges in the entityInputs array,
    //   entityInputFileType: analysis_type ??? this can be on the front end
    //   entityInputs, array of file ids
    //   errorMessage: error_message, errorMessage from workflows
    //   params, from rawInputsJson {paramType: "downloadFormat", downloadName?: string, value: zip/concatenate}
    //   logUrl, // used in admin only, we will deprecate log_url and use something like executionId
    // };
    return [];
  }
  /*----------------- Rails -----------------*/
  const statusDictionary = {
    success: "SUCCEEDED",
    error: "FAILED",
    waiting: "PENDING",
    running: "RUNNING",
  };
  const urlParams = formatUrlParams({
    searchBy: args?.input?.searchBy,
    n: args?.input?.limit,
  });
  const getEntityInputInfo = entities => {
    return entities.map(entity => {
      return {
        id: entity?.id.toString(),
        name: entity?.sample_name,
      };
    });
  };
  const res = await get({
    url: `/bulk_downloads.json${urlParams}`,
    args,
    context,
  });
  const mappedRes = res.map(async (bulkDownload, index) => {
    let url: string | null = null;
    let params: {
      paramType: string;
      downloadName?: string;
      value: string;
    }[] = [];
    let entityInputs: any[] = [];
    if (bulkDownload?.status === "success") {
      const details = await get({
        url: `/bulk_downloads/${bulkDownload?.id}.json`,
        args,
        context,
      });
      url = details?.bulk_download?.presigned_output_url;
      entityInputs = [
        ...getEntityInputInfo(details?.bulk_download?.workflow_runs),
        ...getEntityInputInfo(details?.bulk_download?.pipeline_runs),
      ];
      if (typeof details?.bulk_download?.params === "object") {
        Object.entries(details?.bulk_download?.params)
          // remove "workflow" and "sample_ids" from details?.bulk_download?.params
          .filter(param => param[0] !== "workflow" && param[0] !== "sample_ids")
          // make params into an array of objects
          .map((param: [string, { downloadName?: string; value: string }]) => {
            console.log("param is tuple?", param);
            const paramItem = {
              paramType: snakeToCamel(param[0]),
              ...param[1],
            };
            params.push(paramItem);
          });
      }
    }
    const {
      id,
      status,
      user_id,
      download_type,
      created_at,
      output_file_size,
      logUrl,
      analysis_type,
      analysis_count,
      error_message,
    } = bulkDownload;
    // In Next Gen we will have an array with all of the entity input
    // filtered through the nodes entity query to get the relevant info
    // If there are 22 Consensus Genome Files coming from 20 Samples, there will be 42 items in the array.
    // We will get `sampleNames` by checking __typename to see if the entity is a sample,
    // The amount of other items left in the array should be a the `analysisCount` and the analysis type will come from the file.entity.type
    // Some work will have to be done in the resolver here to surface the right information to the front end from NextGen
    return {
      id: id.toString(), // in NextGen this will be the workflowRun id because that is the only place that has info about failed and in progress bulk download workflows
      startedAt: created_at,
      status: statusDictionary[status],
      downloadType: download_type,
      ownerUserId: user_id,
      fileSize: output_file_size,
      url,
      analysisCount: analysis_count,
      entityInputFileType: analysis_type,
      entityInputs,
      errorMessage: error_message,
      params,
      logUrl, // used in admin only, we will deprecate log_url and use something like executionId
    };
  });
  return mappedRes;
};
