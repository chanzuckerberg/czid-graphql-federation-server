import {
  fetchFromNextGen,
  get,
  postWithCSRF,
  shouldReadFromNextGen,
} from "../../utils/httpUtils";

export const CreateBulkDownloadResolver = async (root, args, context, info) => {
  if (!args?.input) {
    throw new Error("No input provided");
  }
  const {
    downloadType,
    workflow,
    downloadFormat,
    workflowRunIds,
    workflowRunIdsStrings,
  } = args?.input;

  const workflowRunIdsNumbers = workflowRunIdsStrings?.map(
    id => id && parseInt(id),
  );
  const nextGenEnabled = await shouldReadFromNextGen(context);
  /* --------------------- Rails --------------------- */
  if (!nextGenEnabled) {
    const body = {
      download_type: downloadType,
      workflow: workflow,
      params: {
        download_format: {
          value: downloadFormat,
        },
        sample_ids: {
          value: workflowRunIdsNumbers ?? workflowRunIds,
        },
        workflow: {
          value: workflow,
        },
      },
      workflow_run_ids: workflowRunIdsNumbers ?? workflowRunIds,
    };
    const res = await postWithCSRF({
      url: `/bulk_downloads`,
      body,
      args,
      context,
    });
    return res;
  }
  /* --------------------- Next Gen --------------------- */
  // get the default bulk download workflow version id from the workflow service
  if (!workflowRunIdsStrings) {
    throw new Error("No Next Gen Workflow Ids provided for bulk download creation");
  }
  if (!downloadType) {
    throw new Error("No downloadType provided for bulk download creation");
  }
  const getBulkdownloadDefautVersion = `
      query GetBulkDownloadDefaultVersion {
        workflows(where: {name: {_eq: "bulk-download"}}){
          defaultVersion
        }
      }
    `;
  const resDefaultVersion = await get({
    args,
    context,
    serviceType: "workflows",
    customQuery: getBulkdownloadDefautVersion,
  });
  const defaultVersion = resDefaultVersion.data?.workflows?.[0]?.defaultVersion;
  const getBulkdownloadVersionId = `
    query GetBulkDownloadVersionId {
      workflowVersions(
        where: {version: {_eq: "${defaultVersion}"}, workflow: {name: {_eq: "bulk-download"}}}
      ) {
        id
      }
    }
  `;
  const resWorkflowVersionId = await get({
    args,
    context,
    serviceType: "workflows",
    customQuery: getBulkdownloadVersionId,
  });
  const bulkdownloadVersionId =
    resWorkflowVersionId.data?.workflowVersions?.[0]?.id;

  const getFileIdsQuery = `query GetFilesFromEntities {
    consensusGenomes(where: {producingRunId: {_in: [${workflowRunIdsStrings.map(id => `"${id}"`)}]}}){
        collectionId
        id
      }
    }
  `;
  const resFileIds = await get({
    args,
    context,
    serviceType: "entities",
    customQuery: getFileIdsQuery,
  });
  const files = resFileIds.data?.consensusGenomes?.map(consensusGenome => {
    return `{name: "consensus_genomes", entityType: "consensus_genome", entityId: "${consensusGenome.id}"}`;
  });
  // run the workflow version with the files as inputs
  let aggregateAction = "zip";
  if (downloadFormat === "Single File (Concatenated)") {
    aggregateAction = "concatenate";
  }
  console.log("files", files);
  const collectionId = resFileIds.data?.consensusGenomes?.[0]?.collectionId;
  console.log("collectionId", collectionId);
  //TODO: add a real collectionId
  const runBulkDownload = `
      mutation BulkDownload {
        runWorkflowVersion(
          input: {
            collectionId: ${collectionId},
            workflowVersionId: "${bulkdownloadVersionId}",
            rawInputJson: "{ \\\"bulk_download_type\\\": \\\"${downloadType}\\\", \\\"aggregate_action\\\": \\\"${aggregateAction}\\\"}",
            entityInputs: [${files.join(",")}]
          }
        ) {
          id
        }
      }
    `;
  const res = await fetchFromNextGen({
    args,
    context,
    serviceType: "workflows",
    customQuery: runBulkDownload,
  });
  return res;
};
