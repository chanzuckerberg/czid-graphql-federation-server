import {
  fetchFromNextGen,
  get,
  postWithCSRF,
  shouldReadFromNextGen,
} from "../utils/httpUtils";

export const CreateBulkDownloadResolver = async (root, args, context, info) => {
  if (!args?.input) {
    throw new Error("No input provided");
  }
  console.log("CreateBulkDownload args", args);

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
  console.log("resDefaultVersion", resDefaultVersion);
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
  console.log("resWorkflowVersionId", resWorkflowVersionId);
  const bulkdownloadVersionId = resWorkflowVersionId.data?.workflows?.[0]?.id;

  // get the files from the entity service
  console.log("downloadType", downloadType);
  let downloadEntity = "";
  if (downloadType === "consensus_genome") {
    downloadEntity = "sequence";
  } else if (downloadType === "consensus_genome_intermediate_output_files") {
    downloadEntity = "intermediateOutputs";
  }
  const getFileIdsQuery = `query GetFilesFromEntities {
    consensusGenomes(where: {producingRunId: {_in: [${workflowRunIdsStrings?.map(id => `"${id}"`)}]}}){
        ${downloadEntity} {
          id
        }
      }
    }
  `;
  const resFileIds = await get({
    args,
    context,
    serviceType: "entities",
    customQuery: getFileIdsQuery,
  });
  console.log("resFileIds", resFileIds);
  const files = resFileIds.data?.consensusGenomes?.map(consensusGenome => {
    return `{name: "files", entityType: "file", entityId: "${consensusGenome[downloadEntity].id}"}`;
  });

  // run the workflow version with the files as inputs
  let aggregateAction = "zip";
  if (downloadFormat === "Single File (Concatenated)") {
    aggregateAction = "concatenated";
  }
  //TODO: add a real collectionId and bulkdownloadType
  const runBulkDownload = `
      mutation BulkDownload {
        runWorkflowVersion(
          input: {
            collectionId: 1259,
            workflowVersionId: "${bulkdownloadVersionId}",
            rawInputJson: "{ \\\"bulk_download_type\\\": \\\"consensus_genome\\\", \\\"aggregate_action\\\": \\\"${aggregateAction}\\\"}",
            entityInputs: [
              {name: "files", entityId: "018e6800-5cab-7ccb-b96e-53d40f38efac", entityType: "file"},
              {name: "files", entityId: "018e6814-6a7f-77bd-b24d-093df7bb65dd", entityType: "file"},
            ], 
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
  console.log("bulk download kicked off", res);
  return res;
};
