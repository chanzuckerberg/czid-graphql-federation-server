import { get, postWithCSRF, shouldReadFromNextGen } from "../utils/httpUtils";

export const BulkDownloadsCGOverviewResolver = async (
  root,
  args,
  context,
  info,
) => {
  if (!args?.input) {
    throw new Error("No input provided");
  }
  /* --------------------- Next Gen ------------------------- */
  const nextGenEnabled = await shouldReadFromNextGen(context);
  console.log("nextGenEnabled hello", nextGenEnabled);
  console.log(
    "workflowRunIdsStrings",
    args?.input?.workflowRunIdsStrings?.map(id => `"${id}"`),
  );
  if (nextGenEnabled) {
    const entitiesQuery = `
      query EntitiesQuery {
        consensusGenomes(where: {producingRunId: {_in: [${args?.input?.workflowRunIdsStrings?.map(id => `"${id}"`)}]}}) {
          metrics {
            coverageDepth
            totalReads
            mappedReads
            percentGenomeCalled
            percentIdentity
            referenceGenomeLength
            gcPercent
            refSnps
            nActg
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
    // const entitiesResp = {
    //   data: {
    //     consensusGenomes: [
    //       {
    //         metrics: {
    //           coverageDepth: 117.01725370086778,
    //           totalReads: 127140,
    //           mappedReads: 9395,
    //           percentGenomeCalled: 93.6,
    //           percentIdentity: 99,
    //           referenceGenomeLength: 9795,
    //           gcPercent: 42.2,
    //           refSnps: 94,
    //           nMissing: 32,
    //           nAmbiguous: 0,
    //           nActg: 0,
    //         },
    //         sequencingRead: {
    //           sample: {
    //             name: "TestingNameHello",
    //           },
    //         },
    //         referenceGenome: {
    //           name: "Covid-19",
    //           id: "M23423423",
    //         },
    //       },
    //     ],
    //   },
    // };
    const formattedForCSV = {
      cgOverviewRows: [
        [
          "Sample Name",
          "Reference Accession",
          "Reference Accession ID",
          "Reference Length",
          "% Genome Called",
          "%id",
          "GC Content",
          // "ERCC Reads",
          "Total Reads",
          "Mapped Reads",
          "SNPs",
          "Informative Nucleotides",
          "Missing Bases",
          "Ambiguous Bases",
          "Coverage Depth",
        ],
        ...entitiesResp.data.consensusGenomes?.map(cg => [
          cg.sequencingRead?.sample?.name,
          cg.referenceGenome?.name,
          cg.referenceGenome?.id,
          cg.metrics?.referenceGenomeLength,
          cg.metrics?.percentGenomeCalled,
          cg.metrics?.percentIdentity,
          cg.metrics?.percentGenomeCalled,
          // 0, //ERCC Reads
          cg.metrics?.totalReads,
          cg.metrics?.mappedReads,
          cg.metrics?.refSnps,
          cg.metrics?.nActg,
          cg.metrics?.nMissing,
          cg.metrics?.nAmbiguous,
          cg.metrics?.coverageDepth,
        ]),
      ],
    };
    console.log("formattedRes", formattedForCSV);

    return formattedForCSV;
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
