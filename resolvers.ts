// resolvers.ts
import { Resolvers } from "./.mesh";
import { get, notFound } from "./httpUtils";
import { formatSample, formatSamples } from "./samplesQueryUtils";

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
    MngsWorkflowResults: async (root, args, context, info) => {
      const data = await get(`/samples/${args.sampleId}.json`, context);
      const pipelineRun = data.pipeline_runs[0] || {}
      return {
        metric_mngs: {
          assembled: pipelineRun?.assembled,
          adjusted_remaining_reads: pipelineRun?.adjusted_remaining_reads,
          total_ercc_reads: pipelineRun?.total_ercc_reads,
        }
      };
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
    ConsensusGenomeWorkflowResults: async (root, args, context, info) => {
      const { coverage_viz, quality_metrics, taxon_info } = await get(`/workflow_runs/${args.workflowRunId}/results`, context);
      return {
        metric_consensus_genome: {
          ...quality_metrics,
          coverage_viz: coverage_viz,
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
  },
};
