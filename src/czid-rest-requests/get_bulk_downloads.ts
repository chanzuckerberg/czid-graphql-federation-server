import { BulkDownload, TaxonDescription } from "../generated/graphql";
import { makeCZIDRestRequest, toCamelCase } from "../helpers";

export const fetchBulkDownload = async (parent, args, contextValue, info) => {
  const bulkDowloadId = args.bulkDowloadId;
  const requestHeaders = contextValue.headers;
  const res = await makeCZIDRestRequest(
    "bulk_downloads/" + bulkDowloadId,
    requestHeaders
  );
  const bulkDownload: BulkDownloadApiResponse =
    (await res.json()) as BulkDownloadApiResponse;
  console.log(bulkDownload)
  const ret: BulkDownload = transform(bulkDownload);
  console.log(ret)
  return ret;
};

const transform = (
  data: BulkDownloadApiResponse
): BulkDownload => {
  return toCamelCase(data['bulk_download']);
}

interface BulkDownloadApiResponse {
  bulk_download: {
    id: number;
    params_json: string;
    download_type: string;
    status: string;
    error_message: string | null;
    user_id: number
    created_at: string;
    updated_at: string;
    progress: number;
    ecs_task_arn: string | null;
    output_file_size: number;
    description: string | null;
    analysis_type: string;
    analysis_count: number;
    num_samples: number;
    download_name: string;
    file_size: string;
    user_name: string;
    execution_type: string;
    log_url: string | null;
    params: {
      background: {
        value: number
        displayName: string
      };
    };
    pipeline_runs: [];
    workflow_runs: [];
    presigned_output_url: string | null;
  };
  download_type: {
    type: string;
    display_name: string;
    description: string;
    category: string;
    execution_type: string;
    fields: BulkDownloadApiResponseDownloadTypeFields[];
    file_type_display: string;
    workflows: string[];
  };
}

interface BulkDownloadApiResponseDownloadTypeFields {
  display_name: string;
  type: string;
}
