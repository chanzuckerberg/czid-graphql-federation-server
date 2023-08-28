// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace CzidrestTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  ObjMap: { input: any; output: any; }
};

export type Query = {
  BulkDownload?: Maybe<GeneratedMeshSchema>;
  PipelineData?: Maybe<PipelineData>;
  Samples?: Maybe<Samples>;
  TaxonDist?: Maybe<TaxonDist>;
};


export type QueryBulkDownloadArgs = {
  bulkDownloadId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPipelineDataArgs = {
  sampleId?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySamplesArgs = {
  projectId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTaxonDistArgs = {
  backgroundId?: InputMaybe<Scalars['String']['input']>;
  taxonId?: InputMaybe<Scalars['String']['input']>;
};

/** Generated mesh schema from JSON object */
export type GeneratedMeshSchema = {
  bulk_download?: Maybe<query_BulkDownload_bulk_download>;
  download_type?: Maybe<query_BulkDownload_download_type>;
};

export type query_BulkDownload_bulk_download = {
  id?: Maybe<Scalars['JSON']['output']>;
  params_json?: Maybe<Scalars['JSON']['output']>;
  download_type?: Maybe<Scalars['JSON']['output']>;
  status?: Maybe<Scalars['JSON']['output']>;
  error_message?: Maybe<Scalars['JSON']['output']>;
  user_id?: Maybe<Scalars['JSON']['output']>;
  created_at?: Maybe<Scalars['JSON']['output']>;
  updated_at?: Maybe<Scalars['JSON']['output']>;
  progress?: Maybe<Scalars['JSON']['output']>;
  ecs_task_arn?: Maybe<Scalars['JSON']['output']>;
  output_file_size?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['JSON']['output']>;
  deleted_at?: Maybe<Scalars['JSON']['output']>;
  analysis_type?: Maybe<Scalars['JSON']['output']>;
  analysis_count?: Maybe<Scalars['JSON']['output']>;
  num_samples?: Maybe<Scalars['JSON']['output']>;
  download_name?: Maybe<Scalars['JSON']['output']>;
  file_size?: Maybe<Scalars['JSON']['output']>;
  user_name?: Maybe<Scalars['JSON']['output']>;
  execution_type?: Maybe<Scalars['JSON']['output']>;
  log_url?: Maybe<Scalars['JSON']['output']>;
  params?: Maybe<Scalars['JSON']['output']>;
  pipeline_runs?: Maybe<Scalars['JSON']['output']>;
  workflow_runs?: Maybe<Scalars['JSON']['output']>;
  presigned_output_url?: Maybe<Scalars['JSON']['output']>;
};

export type query_BulkDownload_download_type = {
  type?: Maybe<Scalars['JSON']['output']>;
  display_name?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['JSON']['output']>;
  category?: Maybe<Scalars['JSON']['output']>;
  execution_type?: Maybe<Scalars['JSON']['output']>;
  fields?: Maybe<Scalars['JSON']['output']>;
  file_type_display?: Maybe<Scalars['JSON']['output']>;
  workflows?: Maybe<Scalars['JSON']['output']>;
};

export type PipelineData = {
  stages?: Maybe<Array<Maybe<query_PipelineData_stages_items>>>;
  edges?: Maybe<Array<Maybe<query_PipelineData_edges_items>>>;
  status?: Maybe<Scalars['JSON']['output']>;
};

export type query_PipelineData_stages_items = {
  name?: Maybe<Scalars['JSON']['output']>;
  steps?: Maybe<Array<Maybe<query_PipelineData_stages_items_steps_items>>>;
  jobStatus?: Maybe<Scalars['JSON']['output']>;
};

export type query_PipelineData_stages_items_steps_items = {
  name?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['JSON']['output']>;
  inputVariables?: Maybe<Array<Maybe<query_PipelineData_stages_items_steps_items_inputVariables_items>>>;
  outputFiles?: Maybe<Array<Maybe<query_PipelineData_stages_items_steps_items_outputFiles_items>>>;
  inputEdges?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  outputEdges?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
  status?: Maybe<Scalars['JSON']['output']>;
  startTime?: Maybe<Scalars['JSON']['output']>;
  endTime?: Maybe<Scalars['JSON']['output']>;
  resources?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
};

export type query_PipelineData_stages_items_steps_items_inputVariables_items = {
  name?: Maybe<Scalars['JSON']['output']>;
  type?: Maybe<Scalars['JSON']['output']>;
};

export type query_PipelineData_stages_items_steps_items_outputFiles_items = {
  displayName?: Maybe<Scalars['JSON']['output']>;
  url?: Maybe<Scalars['JSON']['output']>;
};

export type query_PipelineData_edges_items = {
  to?: Maybe<query_PipelineData_edges_items_to>;
  from?: Maybe<query_PipelineData_edges_items_from>;
  files?: Maybe<Array<Maybe<query_PipelineData_edges_items_files_items>>>;
  isIntraStage?: Maybe<Scalars['JSON']['output']>;
};

export type query_PipelineData_edges_items_to = {
  stageIndex?: Maybe<Scalars['JSON']['output']>;
  stepIndex?: Maybe<Scalars['JSON']['output']>;
};

export type query_PipelineData_edges_items_from = {
  stageIndex?: Maybe<Scalars['JSON']['output']>;
  stepIndex?: Maybe<Scalars['JSON']['output']>;
};

export type query_PipelineData_edges_items_files_items = {
  displayName?: Maybe<Scalars['JSON']['output']>;
  url?: Maybe<Scalars['JSON']['output']>;
};

export type Samples = {
  samples?: Maybe<Array<Maybe<query_Samples_samples_items>>>;
};

export type query_Samples_samples_items = {
  id?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['JSON']['output']>;
  entity?: Maybe<query_Samples_samples_items_entity>;
  reference_genome?: Maybe<query_Samples_samples_items_reference_genome>;
};

export type query_Samples_samples_items_entity = {
  created_at?: Maybe<Scalars['JSON']['output']>;
  project_id?: Maybe<Scalars['JSON']['output']>;
};

export type query_Samples_samples_items_reference_genome = {
  id?: Maybe<Scalars['JSON']['output']>;
};

export type TaxonDist = {
  merged_NT_NR?: Maybe<query_TaxonDist_merged_NT_NR>;
  NR?: Maybe<query_TaxonDist_NR>;
  NT?: Maybe<query_TaxonDist_NT>;
};

export type query_TaxonDist_merged_NT_NR = {
  tax_level?: Maybe<Scalars['JSON']['output']>;
  mean?: Maybe<Scalars['JSON']['output']>;
  stdev?: Maybe<Scalars['JSON']['output']>;
  rpm_list?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
};

export type query_TaxonDist_NR = {
  tax_level?: Maybe<Scalars['JSON']['output']>;
  mean?: Maybe<Scalars['JSON']['output']>;
  stdev?: Maybe<Scalars['JSON']['output']>;
  rpm_list?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
};

export type query_TaxonDist_NT = {
  tax_level?: Maybe<Scalars['JSON']['output']>;
  mean?: Maybe<Scalars['JSON']['output']>;
  stdev?: Maybe<Scalars['JSON']['output']>;
  rpm_list?: Maybe<Array<Maybe<Scalars['JSON']['output']>>>;
};

export type Mutation = {
  UpdateSampleNotes?: Maybe<Scalars['JSON']['output']>;
};


export type MutationUpdateSampleNotesArgs = {
  sampleId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<mutationInput_UpdateSampleNotes_input_Input>;
};

export type mutationInput_UpdateSampleNotes_input_Input = {
  value?: InputMaybe<Scalars['String']['input']>;
  field?: InputMaybe<Scalars['String']['input']>;
  authenticityToken?: InputMaybe<Scalars['String']['input']>;
};

export type HTTPMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

  export type QuerySdk = {
      /** undefined **/
  BulkDownload: InContextSdkMethod<Query['BulkDownload'], QueryBulkDownloadArgs, MeshContext>,
  /** undefined **/
  PipelineData: InContextSdkMethod<Query['PipelineData'], QueryPipelineDataArgs, MeshContext>,
  /** undefined **/
  Samples: InContextSdkMethod<Query['Samples'], QuerySamplesArgs, MeshContext>,
  /** undefined **/
  TaxonDist: InContextSdkMethod<Query['TaxonDist'], QueryTaxonDistArgs, MeshContext>
  };

  export type MutationSdk = {
      /** undefined **/
  UpdateSampleNotes: InContextSdkMethod<Mutation['UpdateSampleNotes'], MutationUpdateSampleNotesArgs, MeshContext>
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["CZIDREST"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
