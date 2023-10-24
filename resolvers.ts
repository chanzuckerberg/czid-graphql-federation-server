// resolvers.ts
import { Resolvers } from "./.mesh";
import { get } from "./utils";

export const resolvers: Resolvers = {
  Query: {
    AmrWorkflowResults: async (root, args, context, info) => {
      const { quality_metrics, report_table_data } = await get(
        `http://web:3001/workflow_runs/${args.workflowRunId}/results`,
        context
      );
      return {
        metric_amr: quality_metrics,
        amr_hit: report_table_data,
      };
    },
    Background: async (root, args, context, info) => {
      const { other_backgrounds, owned_backgrounds } = await get(
        `http://web:3001/pub/${args.snapshotShareId}/backgrounds.json`,
        context
      );
      const ret = other_backgrounds.concat(owned_backgrounds);
      return ret.map((item: any) => {
        return {
          ...item,
          is_mass_normalized: item.mass_normalized,
        };
      }, []);
    },
    Samples: async (root, args, context, info) => {
      const { samples } = await get(
        `http://web:3001/samples/index_v2.json?projectId=${args.projectId}&snapshotShareId=&basic=true`,
        context
      );
      return samples.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          entity: {
            created_at: item.created_at,
            project_id: item.project_id,
          },
          reference_genome: {
            id: item.host_genome_id,
          },
        };
      }, []);
    },
    ConsensusGenomeWorkflowResults: async (root, args, context, info) => {
      const { coverage_viz, quality_metrics, taxon_info } = await get(
        `http://web:3001/workflow_runs/${args.workflowRunId}/results`,
        context
      );
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
        },
      };
    },
    CoverageVizSummary: async (root, args, context, info) => {
      // should be fetched using pipeline run id instead of sample id
      // from the new backend
      try {
        const coverage_viz_summary = await get(
          `https://web:3001/samples/${args.sampleId}/coverage_viz_summary`,
          context
        );

        const return_obj: any[] = [];
        for (const key in coverage_viz_summary) {
          for (const accension of coverage_viz_summary[key][
            "best_accessions"
          ]) {
            return_obj.push({
              pipeline_id: key,
              ...accension,
            });
          }
        }
        return return_obj;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  },
};
