// resolvers.ts
import { Resolvers } from "./.mesh";
import { get, notFound, formatUrlParams } from "./utils/httpUtils";
import { formatTaxonHits, formatTaxonLineage } from "./utils/mngsWorkflowResultsUtils";
import { formatSample, formatSamples } from "./utils/samplesUtils";

export const resolvers: Resolvers = {
  Query: {
    AmrWorkflowResults: async (root, args, context, info) => {
      const { quality_metrics, report_table_data } = await get(`/workflow_runs/${args.workflowRunId}/results`, context);
      return {
        metric_amr: quality_metrics,
        amr_hit: report_table_data,
      };
    },
    Background: async (root, args, context, info) => {
      const { other_backgrounds, owned_backgrounds } = await get(`/pub/${args.snapshotShareId}/backgrounds.json`, context);
      const ret = other_backgrounds.concat(owned_backgrounds);
      return ret.map((item: any) => {
        return {
          ...item,
          is_mass_normalized: item.mass_normalized,
        };
      }, []);
    },
    ConsensusGenomeWorkflowResults: async (root, args, context, info) => {
      const { coverage_viz, quality_metrics, taxon_info } = await get(`/workflow_runs/${args.workflowRunId}/results`, context);
      return {
        metric_consensus_genome: {
          ...quality_metrics,
          coverage_viz,
        },
        reference_genome: {
          accession_id: taxon_info.accession_id,
          accession_name: taxon_info.accession_name,
          taxon: {
            id: taxon_info.taxon_id,
            name: taxon_info.taxon_name,
          },
        }
      };
    },
    MngsWorkflowResults: async (root, args, context, info) => {
      const data = await get(`/samples/${args.sampleId}.json`, context);
      const pipelineRun = data?.pipeline_runs?.[0] || {};

      const urlParams = formatUrlParams({ id: args.sampleId, pipelineVersion: args.workflowVersionId, background: args._backgroundId, merge_nt_nr: false});
      const { _all_tax_ids, metadata, counts, lineage, _sortedGenus, _highlightedTaxIds } = await get(`/samples/${args.sampleId}/report_v2` + urlParams, context) || {};
      const taxonHits = formatTaxonHits(counts);
      const taxonLineage = formatTaxonLineage(lineage);
      return {
        metric_mngs: {
          assembled: pipelineRun?.assembled,
          adjusted_remaining_reads: pipelineRun?.adjusted_remaining_reads,
          total_ercc_reads: pipelineRun?.total_ercc_reads,
          num_reads: metadata?.preSubsamplingCount,
          num_reads_after_subsampling: metadata?.postSubsamplingCount,
          _: {
            has_byteranges: metadata?.hasByteRanges,
          },
        },
        taxon_hit_results: {
          taxon_hits: taxonHits,
        },
        _: {
          // Computed by PipelineReportService
          lineage: taxonLineage,
        },
      };
    },
    Pathogens: async (root, args, context, info) => {
      const urlParams = formatUrlParams({ id: args.sampleId, pipelineVersion: args.workflowVersionId, merge_nt_nr: false});
      const { _all_tax_ids, _metadata, counts, _lineage, _sortedGenus, _highlightedTaxIds } = await get(`/samples/${args.sampleId}/report_v2` + urlParams, context) || {};
      const speciesCounts = counts?.["1"] || {};
      const genusCounts = counts?.["2"] || {};
      const taxonCounts = Object.entries({...speciesCounts,...genusCounts});
  
      const pathogens : any[] = []
      taxonCounts.forEach(([taxId, taxInfo] : [string, any]) => {
        const isPathogen = !!taxInfo?.pathogenFlag;
        if (isPathogen) {
          pathogens.push({
            tax_id: parseInt(taxId),
          });
        }
      });
      return pathogens;
    },
    Samples: async (root, args, context, info) => {
      if (args.sampleId) {
        const sample = await get(`/samples/${args.sampleId}.json`, context);
        if (args.projectId && sample.project.id !== parseInt(args.projectId)) {
          return notFound(`Sample ${args.sampleId} not found in project ${args.projectId}`);
        }
        return formatSample(sample);
      } else if (args.projectId) {
        const { samples } = await get(`/samples/index_v2.json?projectId=${args.projectId}&snapshotShareId=&basic=true`, context);
        return formatSamples(samples);
      }
    },
    Taxons: async (root, args, context, info) => {
      const urlParams = formatUrlParams({ id: args.sampleId, pipelineVersion: args.workflowVersionId, merge_nt_nr: false});
      const { all_tax_ids, _metadata, counts, lineage, _sortedGenus, _highlightedTaxIds } = await get(`/samples/${args.sampleId}/report_v2` + urlParams, context) || {};
      const speciesCounts = counts?.["1"] || {};
      const genusCounts = counts?.["2"] || {};
      const taxonCounts = Object.entries({...speciesCounts,...genusCounts});

      const taxons : any[] = []
      taxonCounts.forEach(([taxId, taxInfo] : [string, any]) => {
        taxons.push({
          tax_id: parseInt(taxId),
          tax_id_genus: taxInfo?.genus_tax_id,
          common_name: taxInfo?.common_name,
          name: taxInfo?.name,
          is_phage: taxInfo?.is_phage,
          level: speciesCounts.hasOwnProperty(taxId) ? "species" : "genus",
          _: {
            // Computed from TaxonLineage::CATEGORIES
            category: taxInfo?.category,
          }
        });
      });
      return taxons;
    },
    UserBlastAnnotations: async (root, args, context, info) => {
      const urlParams = formatUrlParams({ id: args.sampleId, pipelineVersion: args.workflowVersionId, merge_nt_nr: false});
      const { _all_tax_ids, _metadata, counts, _lineage, _sortedGenus, _highlightedTaxIds } = await get(`/samples/${args.sampleId}/report_v2` + urlParams, context) || {};
      const speciesCounts = counts?.["1"] || {};
      const genusCounts = counts?.["2"] || {};
      const taxonCounts = Object.entries({...speciesCounts,...genusCounts});
  
      const annotations : any[] = []
      taxonCounts.forEach(([taxId, taxInfo] : [string, any]) => {
        const annotation = taxInfo?.annotation;
        if (annotation) {
          annotations.push({
            tax_id: parseInt(taxId),
            annotation: annotation,
          });
        }
      });
      return annotations;
    }
  },
};
