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
          entityInputs{
            edges{
              node{
                fieldName
                inputEntityId
              }
            }
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
    // rawInputsJson looks like this:
    // "rawInputsJson": "{\"bulk_download_type\": \"consensus_genome\", \"aggregate_action\": \"zip\"}",

    // MERGE THE NEXT GEN DOWNLOADS WITH THE RAILS DOWNLOADS
    // Concat NextGen and Rails Downloads (but efficiently?)

    // each workflow run should be returned in this format
    // return {
    //   id: id.toString(), // in NextGen this will be the workflowRun id because that is the only place that has info about failed and in progress bulk download workflows
    //   startedAt: created_at,
    //   status:  workflowRuns.status
    //   downloadType: workflowRuns.rawInputsJson.bulk_download_type,
    //   ownerUserId: workflowRuns.ownerUserId,
    //   fileSize: From Entities,
    //   url: From Entities,
    //   analysisCount: length of the edges array from workflows.entityInputs ,
    //   entityInputFileType: analysis_type - this can be a config on the front end needs to be changed for Rails too
    //   entityInputs, workflowRuns.entityInputs
    //   errorMessage: workflowRuns.errorMessage
    //   params, from rawInputsJson {paramType: "downloadFormat", downloadName?: "File Format", value: either zip/concatenate - found in rawInputsJson}
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
  const mappedRes = res.map(async bulkDownload => {
    const details = await get({
      url: `/bulk_downloads/${bulkDownload?.id}.json`,
      args,
      context,
    });
    const url = details?.bulk_download?.presigned_output_url;
    const entityInputs = [
      ...getEntityInputInfo(details?.bulk_download?.workflow_runs),
      ...getEntityInputInfo(details?.bulk_download?.pipeline_runs),
    ];
    const params: {
      paramType: string;
      downloadName?: string;
      value: string;
    }[] = [];
    Object.entries(details?.bulk_download?.params)
      // remove "workflow" and "sample_ids" from details?.bulk_download?.params
      .filter(param => param[0] !== "workflow" && param[0] !== "sample_ids")
      // make params into an array of objects
      .map((param: [string, { downloadName?: string; value: string }]) => {
        const paramItem = {
          paramType: snakeToCamel(param[0]),
          ...param[1],
        };
        params.push(paramItem);
      });

    const {
      id,
      status,
      user_id,
      download_type,
      created_at,
      output_file_size,
      logUrl,
      analysis_type,
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
      analysisCount: entityInputs.length,
      entityInputFileType: analysis_type,
      entityInputs,
      errorMessage: error_message,
      params,
      logUrl, // used in admin only, we will deprecate log_url and use something like executionId
    };
  });
  return mappedRes;
};
