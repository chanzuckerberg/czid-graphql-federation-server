// resolvers.ts
import {
  Resolvers,
  queryInput_fedSequencingReads_input_where_Input,
  query_fedConsensusGenomes_items,
  query_fedSamples_items,
  query_fedSequencingReads_items,
  query_fedWorkflowRunsAggregate_aggregate_items,
  query_fedWorkflowRuns_items,
} from "./.mesh";
import { SampleForReportResolver } from "./resolver-functions/SampleForReport";
import { BulkDownloadsCGOverviewResolver } from "./resolver-functions/BulkDownloadsCGOverview";
import { fedBulkDowloadsResolver } from "./resolver-functions/fedBulkDownloads/fedBulkDownloads";
import type { NextGenEntitiesTypes } from './.mesh/sources/NextGenEntities/types';
import {
  parseWorkflowsAggregateTotalCountsResponse,
  processWorkflowsAggregateResponse,
} from "./utils/aggregateUtils";
import {
  fetchFromNextGen,
  get,
  getFromRails,
  postWithCSRF,
  shouldReadFromNextGen,
} from "./utils/httpUtils";
import {
  formatTaxonHits,
  formatTaxonLineage,
} from "./utils/mngsWorkflowResultsUtils";
import { formatUrlParams } from "./utils/paramsUtils";
import {
  convertConsensusGenomesQuery,
  convertSequencingReadsQuery,
  convertValidateConsensusGenomeQuery,
  convertWorkflowRunsQuery,
  formatFedQueryForNextGen,
} from "./utils/queryFormatUtils";
import { isRunFinalized, parseRefFasta } from "./utils/responseHelperUtils";
import { CreateBulkDownloadResolver } from "./resolver-functions/CreateBulkDownload/CreateBulkDownload";

/**
 * Arbitrary very large number used temporarily during Rails read phase to force Rails not to
 * paginate our fake "Workflows Service" call.
 */
const TEN_MILLION = 10_000_000;

export const resolvers: Resolvers = {
  Query: {
    adminSamples: async (root, args, context: any, info) => {
      let query: string = context.params.query;
      // TODO: this is only needed to avoid namespace collision while we are using a custom resolver
      query = formatFedQueryForNextGen(query.replace("adminSamples", "samples"));
      console.log(query);
      const response = await fetchFromNextGen({
        args,
        context,
        serviceType: "entities",
        customQuery: query,
      });
      const samples: NextGenEntitiesTypes.Sample[] = response.data.samples;
      if (!samples) {
        throw new Error(`Error fetching samples from NextGen: ${JSON.stringify(response)}`);
      }
      return samples;
    },
    AmrWorkflowResults: async (root, args, context, info) => {
      const { quality_metrics, report_table_data } = await get({
        url: `/workflow_runs/${args.workflowRunId}/results`,
        args,
        context,
      });
      return {
        metric_amr: quality_metrics,
        amr_hit: report_table_data,
      };
    },
    Background: async (root, args, context, info) => {
      const { other_backgrounds, owned_backgrounds } = await get({
        url: `/backgrounds.json`,
        args,
        context,
      });
      const ret = other_backgrounds.concat(owned_backgrounds);
      return ret.map((item: any) => {
        return {
          ...item,
          is_mass_normalized: item.mass_normalized,
        };
      }, []);
    },
    fedBulkDownloads: fedBulkDowloadsResolver,
    BulkDownloadCGOverview: BulkDownloadsCGOverviewResolver,
    fedConsensusGenomes: async (root, args, context: any) => {
      const nextGenEnabled = await shouldReadFromNextGen(context);
      const input = args.input;
      if (input == null) {
        throw new Error("fedConsensusGenomes input was nullish");
      }

      // if there is an _eq in the response then it is a call for a single workflow run result
      if (input.where?.producingRunId?._eq) {
        /* --------------------- Next Gen ------------------------- */
        if (nextGenEnabled) {
          const ret = await get({ args, context, serviceType: "entities" });
          return ret.data.consensusGenomes;
        }
        /* --------------------- Rails ----------------------------- */
        const workflowRunId = input.where.producingRunId._eq;
        const data = await get({
          url: `/workflow_runs/${workflowRunId}/results`,
          args,
          context,
        });
        const { coverage_viz, quality_metrics, taxon_info } = data;
        const { accession_id, accession_name, taxon_id, taxon_name } =
          taxon_info || {};

        const referenceGenomeDownloadUrl = await get({
          url: `/workflow_runs/${workflowRunId}/cg_report_downloads?downloadType=ref_fasta`,
          args,
          context,
        });

        const accession = accession_id && accession_name ? { accessionId: accession_id, accessionName: accession_name } : null;
        const taxon = taxon_id && taxon_name ? { id: taxon_id.toString(), name: taxon_name, commonName: taxon_name } : null;
        const ret = [
          {
            metrics: {
              coverageTotalLength: coverage_viz?.total_length,
              coverageDepth: coverage_viz?.coverage_depth,
              coverageBreadth: coverage_viz?.coverage_breadth,
              coverageBinSize: coverage_viz?.coverage_bin_size,
              coverageViz: coverage_viz?.coverage,
              gcPercent: quality_metrics?.gc_percent,
              percentGenomeCalled: quality_metrics?.percent_genome_called,
              percentIdentity: quality_metrics?.percent_identity,
              refSnps: quality_metrics?.ref_snps,
              nMissing: quality_metrics?.n_missing,
              nAmbiguous: quality_metrics?.n_ambiguous,
              nActg: quality_metrics?.n_actg,
              mappedReads: quality_metrics?.mapped_reads,
            },
            accession: accession,
            taxon: taxon,
            referenceGenome: {
              file: {
                downloadLink: {
                  url: referenceGenomeDownloadUrl.url,
                },
              },
            },
          },
        ];
        return ret;
      }

      // DISCOVERY VIEW:
      if (nextGenEnabled) {
        return (
          await fetchFromNextGen({
            customQuery: convertConsensusGenomesQuery(context.params.query),
            customVariables: {
              where: input.where,
              orderBy: input.orderBy,
            },
            serviceType: "entities",
            args,
            context,
          })
        ).data.consensusGenomes;
      }

      const { workflow_runs } = await get({
        url:
          "/workflow_runs.json" +
          formatUrlParams({
            mode: "basic",
            domain: input?.todoRemove?.domain,
            projectId: input?.todoRemove?.projectId,
            search: input?.todoRemove?.search,
            orderBy: input?.todoRemove?.orderBy,
            orderDir: input?.todoRemove?.orderDir,
            host: input?.todoRemove?.host,
            locationV2: input?.todoRemove?.locationV2,
            taxon: input?.todoRemove?.taxons,
            taxaLevels: input?.todoRemove?.taxaLevels,
            time: input?.todoRemove?.time,
            tissue: input?.todoRemove?.tissue,
            visibility: input?.todoRemove?.visibility,
            workflow: input?.todoRemove?.workflow,
            workflowRunIds: input?.todoRemove?.workflowRunIds,
            sampleIds: input?.todoRemove?.sampleIds,
            limit: TEN_MILLION,
            offset: 0,
            listAllIds: false,
          }),
        args,
        context,
      });
      return workflow_runs.map(run => ({
        sequencingRead: {
          id: run.sample.info.id.toString(),
        },
      }));
    },
    ConsensusGenomeWorkflowResults: async (root, args, context, info) => {
      const { coverage_viz, quality_metrics, taxon_info } = await get({
        url: `/workflow_runs/${args.workflowRunId}/results`,
        args,
        context,
      });
      const { accession_id, accession_name, taxon_id, taxon_name } =
        taxon_info || {};
      return {
        metric_consensus_genome: {
          ...quality_metrics,
          coverage_viz,
        },
        reference_genome: {
          accession_id: accession_id,
          accession_name: accession_name,
          taxon: {
            id: taxon_id?.toString(),
            name: taxon_name,
          },
        },
      };
    },
    CoverageVizSummary: async (root, args, context, info) => {
      // should be fetched using pipeline run id instead of sample id
      // from the new backend
      const coverage_viz_summary = await get({
        url: `/samples/${args.sampleId}/coverage_viz_summary`,
        args,
        context,
      });
      const return_obj: any[] = [];
      for (const key in coverage_viz_summary) {
        for (const accension of coverage_viz_summary[key]["best_accessions"]) {
          return_obj.push({
            pipeline_id: key,
            ...accension,
          });
        }
      }
      return return_obj;
    },
    MetadataFields: async (root, args, context, info) => {
      const body = {
        sampleIds: args?.input?.sampleIds,
      };
      const res = await postWithCSRF({
        url: `/samples/metadata_fields`,
        body,
        args,
        context,
      });
      return res;
    },
    SampleMetadata: async (root, args, context, info) => {
      const url = `/samples/${args.sampleId}/metadata`;
      const urlWithParams = args?.input?.pipelineVersion
        ? url + `?pipeline_version=${args?.input?.pipelineVersion}`
        : url;
      const res = await get({ url: urlWithParams, args, context });
      try {
        const metadata = res.metadata.map(item => {
          item.id = item.id.toString();
          return item;
        });
        if (res?.additional_info?.pipeline_run?.id) {
          res.additional_info.pipeline_run.id =
            res.additional_info.pipeline_run.id.toString();
        }
        // location_validated_value is a union type, so we need to add __typename to the object
        metadata.map(field => {
          if (typeof field.location_validated_value === "object") {
            field.location_validated_value = {
              __typename:
                "query_SampleMetadata_metadata_items_location_validated_value_oneOf_1",
              ...field.location_validated_value,
              id: field.location_validated_value.id.toString(),
            };
          } else if (typeof field.location_validated_value === "string") {
            field.location_validated_value = {
              __typename:
                "query_SampleMetadata_metadata_items_location_validated_value_oneOf_0",
              name: field.location_validated_value,
            };
          } else {
            field.location_validated_value = null;
          }
        });
        res.metadata = metadata;
        return res;
      } catch {
        return res;
      }
    },
    SampleForReport: SampleForReportResolver,
    MngsWorkflowResults: async (root, args, context, info) => {
      const data = await get({
        url: `/samples/${args.sampleId}.json`,
        args,
        context,
      });
      const pipelineRun = data?.pipeline_runs?.[0] || {};

      const urlParams = formatUrlParams({
        id: args.sampleId,
        pipelineVersion: args.workflowVersionId,
        background: args._backgroundId,
        merge_nt_nr: false,
      });
      const {
        _all_tax_ids,
        metadata,
        counts,
        lineage,
        _sortedGenus,
        _highlightedTaxIds,
      } =
        (await get({
          url: `/samples/${args.sampleId}/report_v2` + urlParams,
          args,
          context,
        })) || {};
      const taxonHits = formatTaxonHits(counts);
      const taxonLineage = formatTaxonLineage(lineage);
      return {
        metric_mngs: {
          assembled: pipelineRun?.assembled,
          adjusted_remaining_reads: pipelineRun?.adjusted_remaining_reads,
          total_ercc_reads: pipelineRun?.total_ercc_reads,
          num_reads: metadata?.preSubsamplingCount,
          num_reads_after_subsampling: metadata?.postSubsamplingCount,
          fed_has_byteranges: metadata?.hasByteRanges,
        },
        taxon_hit_results: {
          taxon_hits: taxonHits,
        },
        // Computed by PipelineReportService
        fed_lineage: taxonLineage,
      };
    },
    Pathogens: async (root, args, context, info) => {
      const urlParams = formatUrlParams({
        id: args.sampleId,
        pipelineVersion: args.workflowVersionId,
        merge_nt_nr: false,
      });
      const {
        _all_tax_ids,
        _metadata,
        counts,
        _lineage,
        _sortedGenus,
        _highlightedTaxIds,
      } =
        (await get({
          url: `/samples/${args.sampleId}/report_v2` + urlParams,
          args,
          context,
        })) || {};
      const speciesCounts = counts?.["1"] || {};
      const genusCounts = counts?.["2"] || {};
      const taxonCounts = Object.entries({ ...speciesCounts, ...genusCounts });

      const pathogens: any[] = [];
      taxonCounts.forEach(([taxId, taxInfo]: [string, any]) => {
        const isPathogen = !!taxInfo?.pathogenFlag;
        if (isPathogen) {
          pathogens.push({
            tax_id: parseInt(taxId),
          });
        }
      });
      return pathogens;
    },
    /** Returns just the sample IDs (and old Rails IDs) to determine which IDs pass the filters. */
    fedSamples: async (root, args, context) => {
      const input = args.input;

      // The comments in the formatUrlParams() call correspond to the line in the current
      // codebase's callstack where the params are set, so help ensure we're not missing anything.
      const { workflow_runs } = await get({
        url:
          "/workflow_runs.json" +
          formatUrlParams({
            // index.ts
            // const getWorkflowRuns = ({
            mode: "basic",
            //  - DiscoveryDataLayer.ts
            //    await this._collection.fetchDataCallback({
            domain: input?.todoRemove?.domain,
            //  -- DiscoveryView.tsx
            //     ...this.getConditions(workflow)
            projectId: input?.todoRemove?.projectId,
            search: input?.where?.name?._like,
            orderBy: input?.orderBy?.key,
            orderDir: input?.orderBy?.dir,
            //  --- DiscoveryView.tsx
            //      filters: {
            host: input?.where?.hostOrganism?.name?._in,
            locationV2: input?.where?.collectionLocation?._in,
            taxon: input?.todoRemove?.taxons,
            taxaLevels: input?.todoRemove?.taxaLevels,
            time: input?.todoRemove?.time,
            tissue: input?.where?.sampleType?._in,
            visibility: input?.todoRemove?.visibility,
            workflow: input?.todoRemove?.workflow,
            //  - DiscoveryDataLayer.ts
            //    await this._collection.fetchDataCallback({
            limit: input?.todoRemove?.limit,
            offset: input?.todoRemove?.offset,
            listAllIds: input?.todoRemove?.listAllIds,
          }),
        args,
        context,
      });
      if (!workflow_runs?.length) {
        return [];
      }

      return workflow_runs.map((run): query_fedSamples_items => {
        return {
          id: run.sample?.info?.id?.toString(),
          railsSampleId: run.sample?.info?.id?.toString(),
        };
      });
    },
    fedSequencingReads: async (root, args, context: any) => {
      const input = args.input;
      const queryingIdsOnly = /{\s*id\s*}/.test(context.params.query);
      if (input == null) {
        throw new Error("fedSequencingReads input is nullish");
      }

      // NEXT GEN:
      const nextGenEnabled = await shouldReadFromNextGen(context);
      if (nextGenEnabled) {
        // NEXT GEN IDS:
        if (queryingIdsOnly) {
          const nextGenPromise = fetchFromNextGen({
            customQuery: convertSequencingReadsQuery(context.params.query),
            customVariables: {
              where: {
                collectionId: input.where?.collectionId,
                taxon: input.where?.taxon,
                consensusGenomes: input.where?.consensusGenomes,
                // Entities Service doesn't support sample host + metadata yet.
                sample:
                  input.where?.sample?.name != null
                    ? {
                        name: input.where.sample.name,
                      }
                    : undefined,
              },
              orderBy:
                input.orderByArray?.[0]?.protocol != null ||
                input.orderByArray?.[0]?.technology != null ||
                input.orderByArray?.[0]?.medakaModel != null ||
                input.orderByArray?.[0]?.sample?.name != null
                  ? input.orderByArray
                  : undefined,
            },
            serviceType: "entities",
            args,
            context,
          });

          const isSortingInRails =
            input.orderByArray?.[0]?.sample?.metadata != null ||
            input.orderByArray?.[0]?.sample?.hostOrganism?.name != null;
          if (
            !input.where?.sample?.collectionLocation?._in?.length &&
            !input.where?.sample?.hostOrganism?.name?._in?.length &&
            !input.where?.sample?.sampleType?._in?.length &&
            !isSortingInRails
          ) {
            // Don't need Rails.
            return (await nextGenPromise).data.sequencingReads;
          }

          const railsSampleIds: number[] = (
            await getFromRails({
              url:
                "/samples/index_v2.json" +
                formatUrlParams({
                  locationV2: input?.where?.sample?.collectionLocation?._in,
                  host: input?.where?.sample?.hostOrganism?.name?._in,
                  tissue: input?.where?.sample?.sampleType?._in,
                  orderBy: isSortingInRails
                    ? input.orderByArray?.[0]?.sample?.metadata?.fieldName ??
                      "host"
                    : undefined,
                  orderDir: isSortingInRails
                    ? (input.orderByArray?.[0]?.sample?.metadata?.dir ??
                        input.orderByArray?.[0]?.sample?.hostOrganism?.name) ===
                      "asc_nulls_first"
                      ? "ASC"
                      : "DESC"
                    : undefined,
                  limit: 0,
                  offset: 0,
                  listAllIds: true,
                }),
              args,
              context,
            })
          ).all_samples_ids;

          if (isSortingInRails) {
            const sampleIdsToReads = new Map<number, any>();
            for (const read of (await nextGenPromise).data.sequencingReads) {
              if (!sampleIdsToReads.has(read.sample.railsSampleId)) {
                sampleIdsToReads.set(read.sample.railsSampleId, [read]);
              } else {
                sampleIdsToReads.get(read.sample.railsSampleId)?.push(read);
              }
            }
            return railsSampleIds.flatMap(id => sampleIdsToReads.get(id) ?? []);
          } else {
            const railsSampleIdsSet = new Set(railsSampleIds);
            return (await nextGenPromise).data.sequencingReads.filter(
              sequencingRead =>
                railsSampleIdsSet.has(sequencingRead.sample.railsSampleId),
            );
          }
        }

        // NEXT GEN PAGE:
        const nextGenResponse = await fetchFromNextGen({
          customQuery: convertSequencingReadsQuery(context.params.query),
          customVariables: {
            where: input.where,
            producingRunIds:
              input.consensusGenomesInput?.where?.producingRunId?._in,
          },
          serviceType: "entities",
          args,
          context,
        });
        const nextGenSequencingReads = nextGenResponse?.data?.sequencingReads;
        if (nextGenSequencingReads == null) {
          throw new Error(
            `NextGen sequencingReads query failed: ${JSON.stringify(nextGenResponse)}`,
          );
        }
        const railsSampleIds = nextGenSequencingReads
          .map(sequencingRead => sequencingRead.sample.railsSampleId)
          .filter(id => id != null);
        if (railsSampleIds.length === 0) {
          return [];
        }

        const railsSamplesById = new Map<number, { [key: string]: any }>(
          (
            await getFromRails({
              url:
                "/samples/index_v2.json" +
                formatUrlParams({
                  sampleIds: railsSampleIds,
                  limit: TEN_MILLION,
                  offset: 0,
                  listAllIds: false,
                }),
              args,
              context,
            })
          ).samples.map(sample => [sample.id, sample]),
        );

        for (const nextGenSequencingRead of nextGenSequencingReads) {
          const nextGenSample = nextGenSequencingRead.sample;
          const railsSample = railsSamplesById.get(nextGenSample.railsSampleId);

          const railsMetadata:
            | { [key: string]: string | { name: string } }
            | null
            | undefined = railsSample?.details?.metadata;
          const railsDbSample = railsSample?.details?.db_sample;

          nextGenSequencingRead.nucleicAcid =
            railsMetadata?.nucleotide_type ?? "";
          nextGenSample.collectionLocation =
            typeof railsMetadata?.collection_location_v2 === "string"
              ? railsMetadata.collection_location_v2
              : railsMetadata?.collection_location_v2?.name ?? "";
          nextGenSample.sampleType = railsMetadata?.sample_type ?? "";
          nextGenSample.waterControl = railsMetadata?.water_control === "Yes";
          nextGenSample.notes = railsDbSample?.sample_notes;
          nextGenSample.uploadError = railsDbSample?.upload_error;
          nextGenSample.hostOrganism =
            railsDbSample?.host_genome_name != null
              ? {
                  name: railsDbSample.host_genome_name,
                }
              : null;
          nextGenSample.ownerUserName = railsSample?.details?.uploader?.name;
          nextGenSample.collection = {
            name: railsSample?.details?.derived_sample_output?.project_name,
            public: railsSample?.public === 1,
          };
          nextGenSample.metadatas = {
            edges: getMetadataEdges(railsMetadata),
          };
        }

        return nextGenSequencingReads;
      }

      // RAILS:
      const { workflow_runs } = await get({
        url:
          "/workflow_runs.json" +
          formatUrlParams({
            mode: queryingIdsOnly ? "basic" : "with_sample_info",
            domain: input.todoRemove?.domain,
            projectId: input.todoRemove?.projectId,
            search: input.todoRemove?.search,
            orderBy: input.todoRemove?.orderBy,
            orderDir: input.todoRemove?.orderDir,
            host: input.todoRemove?.host,
            locationV2: input.todoRemove?.locationV2,
            taxon: input.todoRemove?.taxons,
            taxaLevels: input.todoRemove?.taxaLevels,
            time: input.todoRemove?.time,
            tissue: input.todoRemove?.tissue,
            visibility: input.todoRemove?.visibility,
            workflow: input.todoRemove?.workflow,
            limit: queryingIdsOnly
              ? TEN_MILLION
              : input.limit ?? input.limitOffset?.limit, // TODO: Just use limitOffset.
            offset: queryingIdsOnly
              ? 0
              : input.offset ?? input.limitOffset?.offset,
            listAllIds: false,
            // workflowRunIds and sampleIds are only used for API testing.
            workflowRunIds: input?.todoRemove?.workflowRunIds,
            sampleIds: input?.todoRemove?.sampleIds,
          }),
        args,
        context,
      });
      if (queryingIdsOnly) {
        const uniqueSampleIds = new Set<string>(
          workflow_runs.map(run => run.sample.info.id.toString()),
        );
        return [...uniqueSampleIds].map(sampleId => ({
          id: sampleId,
        }));
      }
      if (!workflow_runs?.length) {
        return [];
      }

      const result: query_fedSequencingReads_items[] = [];

      for (const run of workflow_runs) {
        const inputs = run.inputs;
        const qualityMetrics = run.cached_results?.quality_metrics;
        const sample = run.sample;
        const sampleInfo = sample?.info;
        const sampleMetadata = sample?.metadata;

        const id = sampleInfo?.id?.toString() ?? "";
        const taxon =
          inputs?.taxon_name != null
            ? {
                name: inputs.taxon_name,
              }
            : null;
        const accession =
          inputs?.accession_id != null && inputs?.accession_name != null
            ? {
                accessionId: inputs?.accession_id,
                accessionName: inputs?.accession_name,
              }
            : null;
        const consensusGenomeEdge = {
          node: {
            producingRunId: run.id?.toString(),
            taxon,
            referenceGenome: accession,
            accession,
            metrics: {
              coverageDepth: run.cached_results?.coverage_viz?.coverage_depth,
              totalReads: qualityMetrics?.total_reads,
              gcPercent: qualityMetrics?.gc_percent,
              refSnps: qualityMetrics?.ref_snps,
              percentIdentity: qualityMetrics?.percent_identity,
              nActg: qualityMetrics?.n_actg,
              percentGenomeCalled: qualityMetrics?.percent_genome_called,
              nMissing: qualityMetrics?.n_missing,
              nAmbiguous: qualityMetrics?.n_ambiguous,
              referenceGenomeLength: qualityMetrics?.reference_genome_length,
            },
          },
        };

        const existingSequencingRead = result.find(
          sequencingRead => sequencingRead.id === id,
        );
        if (existingSequencingRead !== undefined) {
          existingSequencingRead.consensusGenomes.edges.push(
            consensusGenomeEdge,
          );
        } else {
          result.push({
            id,
            nucleicAcid: sampleMetadata?.nucleotide_type ?? "",
            protocol: inputs?.wetlab_protocol,
            medakaModel: inputs?.medaka_model,
            technology: inputs?.technology ?? "",
            taxon,
            sample: {
              railsSampleId: sampleInfo?.id,
              name: sampleInfo?.name ?? "",
              notes: sampleInfo?.sample_notes,
              uploadError: sampleInfo?.result_status_description,
              collectionLocation:
                typeof sampleMetadata?.collection_location_v2 === "string"
                  ? sampleMetadata.collection_location_v2
                  : sampleMetadata?.collection_location_v2?.name ?? "",
              sampleType: sampleMetadata?.sample_type ?? "",
              waterControl: sampleMetadata?.water_control === "Yes",
              hostOrganism:
                sampleInfo?.host_genome_name != null
                  ? {
                      name: sampleInfo.host_genome_name,
                    }
                  : null,
              collection: {
                name: sample?.project_name,
                public: Boolean(sampleInfo?.public),
              },
              ownerUserId: sample?.uploader?.id,
              // TODO: Make runner come from Workflows stitched with the user service when NextGen
              // ready.
              ownerUserName: run.runner?.name ?? sample?.uploader?.name,
              metadatas: {
                edges: getMetadataEdges(sampleMetadata),
              },
            },
            consensusGenomes: {
              edges: [consensusGenomeEdge],
            },
          });
        }
      }

      return result;
    },
    ValidateUserCanDeleteObjects: async (root, args, context, info) => {
      if (!args?.input) {
        throw new Error("No input provided");
      }
      const { selectedIdsStrings, workflow, selectedIds } = args?.input;
      const body = {
        selectedIds: selectedIdsStrings ?? selectedIds,
        workflow: workflow,
      };
      const res = await postWithCSRF({
        url: `/samples/validate_user_can_delete_objects.json`,
        body,
        args,
        context,
      });
      return {
        validIds: res.validIds.map((id: number) => id.toString()),
        ...res,
      }
    },
    Taxons: async (root, args, context, info) => {
      const urlParams = formatUrlParams({
        id: args.sampleId,
        pipelineVersion: args.workflowVersionId,
        merge_nt_nr: false,
      });
      const {
        all_tax_ids,
        _metadata,
        counts,
        lineage,
        _sortedGenus,
        _highlightedTaxIds,
      } =
        (await get({
          url: `/samples/${args.sampleId}/report_v2` + urlParams,
          args,
          context,
        })) || {};
      const speciesCounts = counts?.["1"] || {};
      const genusCounts = counts?.["2"] || {};
      const taxonCounts = Object.entries({ ...speciesCounts, ...genusCounts });

      const taxons: any[] = [];
      taxonCounts.forEach(([taxId, taxInfo]: [string, any]) => {
        taxons.push({
          tax_id: parseInt(taxId),
          tax_id_genus: taxInfo?.genus_tax_id,
          common_name: taxInfo?.common_name,
          name: taxInfo?.name,
          is_phage: taxInfo?.is_phage,
          level: speciesCounts.hasOwnProperty(taxId) ? "species" : "genus",
          // Computed from TaxonLineage::CATEGORIES
          fed_category: taxInfo?.category,
        });
      });
      return taxons;
    },
    UserBlastAnnotations: async (root, args, context, info) => {
      const urlParams = formatUrlParams({
        id: args.sampleId,
        pipelineVersion: args.workflowVersionId,
        merge_nt_nr: false,
      });
      const { counts } =
        (await get({
          url: `/samples/${args.sampleId}/report_v2` + urlParams,
          args,
          context,
        })) || {};
      const speciesCounts = counts?.["1"] || {};
      const genusCounts = counts?.["2"] || {};
      const taxonCounts = Object.entries({ ...speciesCounts, ...genusCounts });

      const annotations: any[] = [];
      taxonCounts.forEach(([taxId, taxInfo]: [string, any]) => {
        const annotation = taxInfo?.annotation;
        if (annotation) {
          annotations.push({
            tax_id: parseInt(taxId),
            annotation: annotation,
          });
        }
      });
      return annotations;
    },
    fedWorkflowRuns: async (_, args, context: any) => {
      const input = args.input;
      if (input == null) {
        throw new Error("fedWorkflowRuns input is nullish");
      }
      const nextGenEnabled = await shouldReadFromNextGen(context);

      // CG BULK DOWNLOAD MODAL:
      // If we provide a list of workflowRunIds, we assume that this is for getting valid consensus genome workflow runs.
      // This endpoint only provides id, ownerUserId, and status.
      if (input.where?.id?._in && typeof input.where?.id?._in === "object") {
        const workflowRunIds = input.where.id._in;
        if (nextGenEnabled) {
          const query = convertValidateConsensusGenomeQuery(
            context.params.query,
          );
          const response = await fetchFromNextGen({
            customQuery: query,
            customVariables: {
              where: input.where,
            },
            args,
            context,
            serviceType: "workflows",
          });
          if (response?.data?.workflowRuns == null) {
            throw new Error(
              `NextGen validate workflowRuns query failed: ${JSON.stringify(response)}`,
            );
          }
          return response.data.workflowRuns;
        } else {
          const body = {
            authenticity_token: input.todoRemove?.authenticityToken,
            workflowRunIds: workflowRunIds.map(id => id && parseInt(id)),
          };
          const { workflowRuns } = await postWithCSRF({
            url: `/workflow_runs/valid_consensus_genome_workflow_runs`,
            body,
            args,
            context,
          });
          return workflowRuns.map(run => ({
            id: run.id.toString(),
            ownerUserId: run.owner_user_id,
            status: run.status,
          }));
        }
      }

      // DISCOVERY VIEW:
      if (nextGenEnabled) {
        const response = await fetchFromNextGen({
          customQuery: convertWorkflowRunsQuery(context.params.query),
          customVariables: {
            where: input.where,
            // TODO: Migrate to array orderBy.
            orderBy:
              (input.orderBy != null ? [input.orderBy] : undefined) ??
              input.orderByArray,
          },
          serviceType: "workflows",
          args,
          context,
        });
        if (response?.data?.workflowRuns == null) {
          throw new Error(
            `NextGen workflowRuns query failed: ${JSON.stringify(response)}`,
          );
        }
        return response.data.workflowRuns;
      }

      // TODO(bchu): Remove all the non-Workflows fields after moving and integrating them into the
      // Entities call.
      const { workflow_runs } = await get({
        url:
          "/workflow_runs.json" +
          formatUrlParams({
            mode: "basic",
            domain: input.todoRemove?.domain,
            projectId: input.todoRemove?.projectId,
            search: input.todoRemove?.search,
            orderBy: input.todoRemove?.orderBy,
            orderDir: input.todoRemove?.orderDir,
            host: input.todoRemove?.host,
            locationV2: input.todoRemove?.locationV2,
            taxon: input.todoRemove?.taxon,
            taxaLevels: input.todoRemove?.taxonLevels,
            time: input.todoRemove?.time,
            tissue: input.todoRemove?.tissue,
            visibility: input.todoRemove?.visibility,
            workflow: input.todoRemove?.workflow,
            limit: TEN_MILLION,
            offset: 0,
            listAllIds: false,
          }),
        args,
        context,
      });
      if (!workflow_runs?.length) {
        return [];
      }

      return workflow_runs.map(
        (run): query_fedWorkflowRuns_items => ({
          id: run.id?.toString(),
          ownerUserId: run.runner?.id?.toString(),
          startedAt: run.created_at,
          status: run.status,
          rawInputsJson: `{"creation_source": "${run.inputs?.creation_source ?? ""}"}`,
          workflowVersion: {
            version: run.wdl_version,
            workflow: {
              name: run.inputs?.creation_source, // TODO: Delete when FE uses rawInputsJson.
            },
          },
          entityInputs: {
            edges: [
              {
                node: {
                  entityType: "sequencing_read",
                  inputEntityId: run.sample?.info?.id?.toString(),
                },
              },
            ],
          },
        }),
      );
    },
    fedWorkflowRunsAggregate: async (root, args, context: any, info) => {
      const input = args.input;
      const paginatedProjectIds = input?.where?.collectionId?._in?.length
        ? new Set(input.where.collectionId._in)
        : undefined;

      const { projects } = await get({
        url:
          "/projects.json" +
          formatUrlParams({
            projectId: input?.todoRemove?.projectId,
            domain: input?.todoRemove?.domain,
            limit: TEN_MILLION,
            listAllIds: false,
            offset: 0,
            host: input?.todoRemove?.host,
            locationV2: input?.todoRemove?.locationV2,
            taxonThresholds: input?.todoRemove?.taxonThresholds,
            annotations: input?.todoRemove?.annotations,
            search: input?.todoRemove?.search,
            tissue: input?.todoRemove?.tissue,
            visibility: input?.todoRemove?.visibility,
            time: input?.todoRemove?.time,
            taxaLevels: input?.todoRemove?.taxaLevels,
            taxon: input?.todoRemove?.taxon,
          }),
        args,
        context,
      });

      const nextGenEnabled = await shouldReadFromNextGen(context);

      let nextGenProjectAggregates: query_fedWorkflowRunsAggregate_aggregate_items[] =
        [];

      if (nextGenEnabled) {
        const customQuery = `
          query nextGenWorkflowsAggregate($where: WorkflowRunWhereClause) {
            workflowRunsAggregate(where: $where) {
              aggregate {
                groupBy {
                  collectionId
                  workflowVersion {
                    workflow {
                      name
                    }
                  }
                }
                count
              }
            }
          }
        `;
        const consensusGenomesAggregateResponse = await fetchFromNextGen({
          args,
          context,
          serviceType: "workflows",
          customQuery,
          customVariables: {
            where: args.input?.where,
          },
        });
        nextGenProjectAggregates =
          consensusGenomesAggregateResponse?.data?.workflowRunsAggregate
            ?.aggregate;
      }

      return processWorkflowsAggregateResponse(
        nextGenProjectAggregates,
        projects.filter(
          project =>
            paginatedProjectIds === undefined ||
            paginatedProjectIds.has(project.id),
        ),
        nextGenEnabled,
      );
    },
    fedWorkflowRunsAggregateTotalCount: async (root, args, context, info) => {
      const input = args.input;
      const { countByWorkflow: railsCountByWorkflow } = await get({
        url:
          "/samples/stats.json" +
          formatUrlParams({
            domain: input?.todoRemove?.domain,
            projectId: input?.todoRemove?.projectId,
          }),
        args,
        context,
      });

      let nextGenAggregates = [];
      // the frontend decides which workflows are fetched from NextGen vs Rails
      const nextgenWorkflows =
        (input?.where?.workflowVersion?.workflow?.name?._in as string[]) || [];

      const nextGenEnabled = await shouldReadFromNextGen(context);
      if (nextGenEnabled) {
        const totalCountQuery = `
          query nextGenWorkflowsAggregateTotalCount($where: WorkflowRunWhereClause) {
            workflowRunsAggregate(where: $where) {
              aggregate {
                count
                groupBy {
                  workflowVersion {
                    workflow {
                      name
                    }
                  }
                }
              }
            }
          }
        `;
        const totalCountResponse = await fetchFromNextGen({
          args,
          context,
          serviceType: "workflows",
          customQuery: totalCountQuery,
          customVariables: {
            where: args.input?.where,
          },
        });

        nextGenAggregates =
          totalCountResponse?.data?.workflowRunsAggregate?.aggregate;
      }

      return parseWorkflowsAggregateTotalCountsResponse(
        nextGenAggregates,
        railsCountByWorkflow,
        nextGenEnabled,
        nextgenWorkflows,
      );
    },
    ZipLink: async (root, args, context, info) => {
      /* --------------------- Next Gen ------------------------- */
      const nextGenEnabled = await shouldReadFromNextGen(context);
      if (nextGenEnabled) {
        const customQuery = `
          query GetZipLink {
            consensusGenomes(where: {producingRunId: {_eq: "${args.workflowRunId}"}}){
              intermediateOutputs {
                downloadLink {
                  url
                }
              }
            }
          }
        `;
        const ret = await get({
          args,
          context,
          serviceType: "entities",
          customQuery,
        });
        if (
          ret.data?.consensusGenomes[0]?.intermediateOutputs?.downloadLink?.url
        ) {
          return {
            url: ret.data.consensusGenomes[0].intermediateOutputs.downloadLink
              .url,
          };
        } else {
          return {
            url: null,
            error: ret.error,
          };
        }
      }
      /* --------------------- Rails ------------------------- */
      const res = await get({
        url: `/workflow_runs/${args.workflowRunId}/zip_link.json`,
        args,
        context,
        fullResponse: true,
      });
      if (res.status !== 200) {
        return {
          url: null,
          error: res.statusText,
        };
      }
      const url = res.url;
      return {
        url,
      };
    },
    GraphQLFederationVersion: () => ({
      version: process.env.CZID_GQL_FED_GIT_VERSION,
      gitCommit: process.env.CZID_GQL_FED_GIT_SHA,
    }),
  },
  Mutation: {
    CreateBulkDownload: CreateBulkDownloadResolver,
    DeleteSamples: async (root, args, context, info) => {
      if (!args?.input) {
        throw new Error("No input provided");
      }
      const { idsStrings, workflow, ids } = args?.input;
      const body = {
        selectedIds: idsStrings ?? ids,
        workflow: workflow,
      };
      const { deletedIds, error } = await postWithCSRF({
        url: `/samples/bulk_delete`,
        body,
        args,
        context,
      });
      return {
        deleted_workflow_ids: deletedIds,
        error: error,
      };
    },
    KickoffWGSWorkflow: async (root, args, context, info) => {
      const body = {
        workflow: args?.input?.workflow,
        inputs_json: args?.input?.inputs_json,
      };
      const res = await postWithCSRF({
        url: `/samples/${args.sampleId}/kickoff_workflow`,
        body,
        args,
        context,
      });
      try {
        const formattedRes = res.map(item => {
          item.id = item.id.toString();
          return item;
        });
        return formattedRes;
      } catch {
        return res;
      }
    },
    KickoffAMRWorkflow: async (root, args, context, info) => {
      const body = {
        workflow: args?.input?.workflow,
        inputs_json: args?.input?.inputs_json,
      };
      const res = await postWithCSRF({
        url: `/samples/${args.sampleId}/kickoff_workflow`,
        body,
        args,
        context,
      });
      return res;
    },
    UpdateMetadata: async (root, args, context, info) => {
      const body = {
        field: args?.input?.field,
        value: args?.input?.value.String
          ? args.input.value.String
          : args?.input?.value
              .query_SampleMetadata_metadata_items_location_validated_value_oneOf_1_Input,
      };
      const res = await postWithCSRF({
        url: `/samples/${args.sampleId}/save_metadata_v2`,
        body,
        args,
        context,
      });
      return res;
    },
    UpdateSampleNotes: async (root, args, context, info) => {
      const body = {
        field: "sample_notes",
        value: args?.input?.value,
      };
      const res = await postWithCSRF({
        url: `/samples/${args.sampleId}/save_metadata`,
        body,
        args,
        context,
      });
      return res;
    },
    UpdateSampleName: async (root, args, context, info) => {
      const body = {
        field: "name",
        value: args?.input?.value,
      };
      const res = await postWithCSRF({
        url: `/samples/${args.sampleId}/save_metadata`,
        body,
        args,
        context,
      });
      return res;
    },
  },
};

function getMetadataEdges(
  sampleMetadata: any,
): Array<{ node: { fieldName: string; value: string } }> {
  return sampleMetadata != null
    ? Object.entries(sampleMetadata)
        .filter(
          ([fieldName]) =>
            fieldName !== "nucleotide_type" &&
            fieldName !== "collection_location_v2" &&
            fieldName !== "sample_type" &&
            fieldName !== "water_control",
        )
        .map(([fieldName, value]) => ({
          node: {
            fieldName,
            value: String(value),
          },
        }))
    : [];
}
