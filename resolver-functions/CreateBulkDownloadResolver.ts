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
        workflows(where: {name: {_eq: "bulk-downloads"}}){
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
  const defaultVersion = resDefaultVersion.data.workflows[0].defaultVersion;
  const getBulkdownloadVersionId = `
      query MyQuery {
        workflows(
          where: {versions: {version: {_eq: ${defaultVersion}}}, name: {_eq: "bulk-download"}}
        ) {
          id
        }
      }`;
  const resWorkflowVersionId = await get({
    args,
    context,
    serviceType: "workflows",
    customQuery: getBulkdownloadVersionId,
  });
  console.log("resWorkflowVersionId", resWorkflowVersionId);
  const bulkdownloadVersionId = resWorkflowVersionId.data.workflows[0].id;

  // get the files from the entity service
  console.log("downloadType", downloadType);
  let downloadEntity;
  let downloadDisplayName;
  if (downloadType === "consensus_genome") {
    downloadEntity = "sequence";
    downloadDisplayName = "Consensus Genome";
  } else if (downloadType === "consensus_genome_intermediate_output_files") {
    downloadEntity = "intermediateOutputs";
    downloadDisplayName = "Intermediate Output Files";
  }
  const getFileIdsQuery = `query GetFilesFromEntities {
        consensusGenomes(where: {producingRunId: {_in: ${workflowRunIdsStrings}}}){
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
  const files = resFileIds.data.consensusGenomes.map(consensusGenome => {
    return `{name: "files", entityType: "file", entityId: ${consensusGenome[downloadEntity].id}}`;
  });

  // run the workflow version with the files as inputs
  let bulkDownloadType = "zip";
  if (downloadFormat === "Single File (Concatenated)") {
    bulkDownloadType = "concatenated";
  }
  //TODO: could add a collectionId - not sure if we need it
  const runBulkDownload = `
      mutation BulkDownload {
        runWorkflowVersion(
          input: {
            workflowVersionId: ${bulkdownloadVersionId},
            rawInputJson: "{ \"bulk_download_type\": \"${bulkDownloadType}\", \"download_display_name\": \"${downloadDisplayName}\" }",
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
  console.log("bulk download kicked off", res);
  return res;
};
