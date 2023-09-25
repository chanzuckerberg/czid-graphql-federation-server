export const formatSample = (sample: any) => {
    // In the next-gen architecture, both pipeline_runs and workflow_runs will be stored in the same table.
    const pipelineRuns = sample.pipeline_runs.map((pr: any) => {
        return {
          id: pr.id,
          status: pr.run_finalized ? "FINALIZED" : "",
          started_at: pr.created_at,
          workflow_version_id: pr.pipeline_version,
          inputs_json: {
            alignment_config_name: pr.alignment_config_name,
          }
        }
    });
    let technology = "";
    const workflowRuns = sample.workflow_runs.map((wr: any) => {
    technology = wr.inputs.technology;
    return {
        id: wr.id,
        status: wr.status,
        started_at: wr.executed_at,
        workflow_version_id: wr.wdl_version,
        inputs_json: {
            alignment_config_name: wr.inputs.alignment_config_name,
        },
        outputs_json: {
            input_error: wr.input_error,
        },
    }
    });

    return [
    {
        name: sample.name,
        entity: {
            created_at: sample.created_at,
            updated_at: sample.updated_at,
            owner_user_id: sample.user_id,
            producing_run_id: sample.default_background_id,
            project: sample.project,
        },
        reference_genome: {
            id: sample.host_genome_id,
            background_id: sample.default_background_id,
        },
        sequence_reads: {
            sequencing_technology: technology,
        },
        file: {
            upload_status: sample.status,
            upload_error: sample.upload_error,
        },
        runs: [...pipelineRuns, ...workflowRuns],
    }
    ];
}

export const formatSamples = (samples: any) => {
    return samples.map((item: any) => {
        return {
            id: item.id,
            name: item.name,
            entity: {
              created_at: item.created_at,
              project: {
                id: item.project_id,
              },
            },
            reference_genome: {
              id: item.host_genome_id,
            }
        };
    }, []);
}
