import { get, postWithCSRF, shouldReadFromNextGen } from "../utils/httpUtils";

export const BulkDownloadsCGOverviewResolver = async (
  root,
  args,
  context,
  info,
) => {
  /* --------------------- Next Gen ------------------------- */
  const nextGenEnabled = await shouldReadFromNextGen(context);
  if (nextGenEnabled) {
    const entitiesQuery = `
      query EntitiesQuery {
        consensusGenomes(where: {producingRunId: {in: ${args?.input?.workflowRunIdsStrings}}}) {
          metrics {
            coverageDepth
            totalReads
            mappedReads
            percentGenomeCalled
            percentIdentity
            referenceGenomeLength
            gcPercent
            refSnps
            nMissing
            nAmbiguous
          }
          sequencingRead {
            sample {
              name
            }
          }
          referenceGenome {
            name
            id
          }
        }
      } 
    `;
    const entitiesResp = await get({
      args,
      context,
      serviceType: "entities",
      customQuery: entitiesQuery,
    });
    console.log("entitiesResp", entitiesResp);
  }
  if (!args?.input) {
    throw new Error("No input provided");
  }
  const {
    downloadType,
    workflow,
    includeMetadata,
    workflowRunIds,
    workflowRunIdsStrings,
  } = args?.input;

  //array of strings to array of numbers
  const workflowRunIdsNumbers = workflowRunIdsStrings?.map(
    id => id && parseInt(id),
  );

  const body = {
    download_type: downloadType,
    workflow: workflow,
    params: {
      include_metadata: { value: includeMetadata },
      sample_ids: {
        value: workflowRunIdsNumbers ? workflowRunIdsNumbers : workflowRunIds,
      },
      workflow: {
        value: workflow,
      },
    },
    workflow_run_ids: workflowRunIdsNumbers
      ? workflowRunIdsNumbers
      : workflowRunIds,
  };
  const res = await postWithCSRF({
    url: `/bulk_downloads/consensus_genome_overview_data`,
    body,
    args,
    context,
  });
  if (res?.cg_overview_rows) {
    return {
      cgOverviewRows: res?.cg_overview_rows,
    };
  } else {
    throw new Error(res.error);
  }
};
