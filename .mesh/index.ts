// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import JsonSchemaHandler from "@graphql-mesh/json-schema"
import StitchingMerger from "@graphql-mesh/merger-stitching";
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { CzidrestTypes } from './sources/CZIDREST/types';
import type { CzidgqlTypes } from './sources/CZIDGQL/types';
import * as importedModule$0 from "./sources/CZIDGQL/introspectionSchema";
import * as importedModule$1 from "./sources/CZIDREST/schemaWithAnnotations";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Represents non-fractional signed whole numeric values. Since the value may
   * exceed the size of a 32-bit integer, it's encoded as a string.
   */
  BigInt: { input: any; output: any; }
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  ObjMap: { input: any; output: any; }
};

export type Query = {
  appConfig?: Maybe<AppConfig>;
  pathogenList: PathogenList;
  project: Project;
  sample: Sample;
  sampleReadsStats: SampleReadsStatsList;
  samplesList: SampleList;
  user: User;
  BulkDownload?: Maybe<GeneratedMeshSchema>;
  PipelineData?: Maybe<PipelineData>;
  TaxonDist?: Maybe<TaxonDist>;
  Background?: Maybe<Background>;
};


export type QueryappConfigArgs = {
  id: Scalars['ID']['input'];
};


export type QuerypathogenListArgs = {
  version?: InputMaybe<Scalars['String']['input']>;
};


export type QueryprojectArgs = {
  id: Scalars['Int']['input'];
};


export type QuerysampleArgs = {
  sampleId: Scalars['Int']['input'];
};


export type QuerysampleReadsStatsArgs = {
  sampleIds: Array<Scalars['Int']['input']>;
};


export type QuerysamplesListArgs = {
  annotations?: InputMaybe<Array<Annotation>>;
  basic?: InputMaybe<Scalars['Boolean']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  hostIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  listAllIds?: InputMaybe<Scalars['Boolean']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  locationV2?: InputMaybe<Array<Scalars['String']['input']>>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDir?: InputMaybe<Scalars['String']['input']>;
  projectId?: InputMaybe<Scalars['Int']['input']>;
  requestedSampleIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  sampleIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  searchString?: InputMaybe<Scalars['String']['input']>;
  taxIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  taxLevels?: InputMaybe<Array<Scalars['String']['input']>>;
  thresholdFilterInfo?: InputMaybe<Scalars['String']['input']>;
  time?: InputMaybe<Array<Scalars['String']['input']>>;
  tissue?: InputMaybe<Array<Scalars['String']['input']>>;
  visibility?: InputMaybe<Array<Scalars['String']['input']>>;
  workflow?: InputMaybe<Scalars['String']['input']>;
};


export type QueryuserArgs = {
  archetypes: Scalars['String']['input'];
  email: Scalars['String']['input'];
  institution: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Scalars['Int']['input'];
  segments: Scalars['String']['input'];
};


export type QueryBulkDownloadArgs = {
  bulkDownloadId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPipelineDataArgs = {
  sampleId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTaxonDistArgs = {
  backgroundId?: InputMaybe<Scalars['String']['input']>;
  taxonId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBackgroundArgs = {
  snapshotShareId?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  createUser: CreateUserPayload;
  UpdateSampleNotes?: Maybe<Scalars['JSON']['output']>;
};


export type MutationcreateUserArgs = {
  archetypes?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  institution?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['Int']['input']>;
  segments?: InputMaybe<Scalars['String']['input']>;
  sendActivation?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationUpdateSampleNotesArgs = {
  sampleId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<mutationInput_UpdateSampleNotes_input_Input>;
};

export type AlignmentConfig = {
  createdAt: Scalars['ISO8601DateTime']['output'];
  indexDirSuffix?: Maybe<Scalars['String']['output']>;
  lineageVersion: Scalars['String']['output'];
  lineageVersionOld?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  s3Accession2taxidPath?: Maybe<Scalars['String']['output']>;
  s3DeuterostomeDbPath?: Maybe<Scalars['String']['output']>;
  s3LineagePath?: Maybe<Scalars['String']['output']>;
  s3NrDbPath?: Maybe<Scalars['String']['output']>;
  s3NrLocDbPath?: Maybe<Scalars['String']['output']>;
  s3NtDbPath?: Maybe<Scalars['String']['output']>;
  s3NtInfoDbPath?: Maybe<Scalars['String']['output']>;
  s3NtLocDbPath?: Maybe<Scalars['String']['output']>;
  s3TaxonBlacklistPath?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Annotation = {
  name: Scalars['String']['input'];
};

export type AppConfig = {
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

/** Autogenerated return type of CreateUser. */
export type CreateUserPayload = {
  archetypes?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  institution?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['Int']['output']>;
  segments?: Maybe<Scalars['String']['output']>;
  sendActivation?: Maybe<Scalars['Boolean']['output']>;
};

export type DbSample = {
  alignmentConfigName?: Maybe<Scalars['String']['output']>;
  basespaceAccessToken?: Maybe<Scalars['String']['output']>;
  clientUpdatedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  dagVars?: Maybe<Scalars['String']['output']>;
  doNotProcess: Scalars['Boolean']['output'];
  hostGenomeId?: Maybe<Scalars['Int']['output']>;
  hostGenomeName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  initialWorkflow: Scalars['String']['output'];
  inputFiles: Array<InputFile>;
  maxInputFragments?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pipelineBranch?: Maybe<Scalars['String']['output']>;
  pipelineCommit?: Maybe<Scalars['String']['output']>;
  pipelineExecutionStrategy?: Maybe<Scalars['String']['output']>;
  privateUntil?: Maybe<Scalars['ISO8601DateTime']['output']>;
  projectId?: Maybe<Scalars['Int']['output']>;
  s3Bowtie2IndexPath?: Maybe<Scalars['String']['output']>;
  s3PreloadResultPath?: Maybe<Scalars['String']['output']>;
  s3StarIndexPath?: Maybe<Scalars['String']['output']>;
  sampleNotes?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  subsample?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  uploadError?: Maybe<Scalars['String']['output']>;
  uploadedFromBasespace: Scalars['Int']['output'];
  useTaxonWhitelist: Scalars['Boolean']['output'];
  userId: Scalars['Int']['output'];
  webCommit?: Maybe<Scalars['String']['output']>;
};

export type DerivedSampleOutput = {
  hostGenomeName: Scalars['String']['output'];
  pipelineRun?: Maybe<PipelineRun>;
  projectName: Scalars['String']['output'];
  summaryStats?: Maybe<SampleSummaryStats>;
};

export type HostGenome = {
  createdAt: Scalars['ISO8601DateTime']['output'];
  defaultBackgroundId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  s3Bowtie2IndexPath: Scalars['String']['output'];
  s3Minimap2IndexPath?: Maybe<Scalars['String']['output']>;
  s3StarIndexPath: Scalars['String']['output'];
  samplesCount: Scalars['Int']['output'];
  skipDeuteroFilter: Scalars['Int']['output'];
  taxaCategory: Scalars['String']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type InputFile = {
  createdAt: Scalars['ISO8601DateTime']['output'];
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  parts?: Maybe<Scalars['String']['output']>;
  presignedUrl?: Maybe<Scalars['String']['output']>;
  sampleId: Scalars['Int']['output'];
  source?: Maybe<Scalars['String']['output']>;
  sourceType?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  uploadClient?: Maybe<Scalars['String']['output']>;
};

export type MngsRunInfo = {
  createdAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  finalized?: Maybe<Scalars['Int']['output']>;
  reportReady?: Maybe<Scalars['Boolean']['output']>;
  resultStatusDescription?: Maybe<Scalars['String']['output']>;
  totalRuntime?: Maybe<Scalars['Int']['output']>;
  withAssembly?: Maybe<Scalars['Int']['output']>;
};

export type Pathogen = {
  category?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  taxId?: Maybe<Scalars['Int']['output']>;
};

export type PathogenList = {
  citations?: Maybe<Array<Scalars['String']['output']>>;
  createdAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pathogens?: Maybe<Array<Pathogen>>;
  updatedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type PipelineRun = {
  adjustedRemainingReads?: Maybe<Scalars['Int']['output']>;
  alertSent: Scalars['Boolean']['output'];
  alignmentConfig?: Maybe<AlignmentConfig>;
  alignmentConfigId?: Maybe<Scalars['Int']['output']>;
  alignmentConfigName?: Maybe<Scalars['String']['output']>;
  assembled?: Maybe<Scalars['Int']['output']>;
  compressionRatio?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  dagVars?: Maybe<Scalars['String']['output']>;
  deprecated?: Maybe<Scalars['Boolean']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  executedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  finalized?: Maybe<Scalars['Int']['output']>;
  fractionSubsampled?: Maybe<Scalars['Float']['output']>;
  id: Scalars['Int']['output'];
  jobStatus?: Maybe<Scalars['String']['output']>;
  knownUserError?: Maybe<Scalars['String']['output']>;
  maxInputFragments?: Maybe<Scalars['Int']['output']>;
  pipelineBranch?: Maybe<Scalars['String']['output']>;
  pipelineCommit?: Maybe<Scalars['String']['output']>;
  pipelineExecutionStrategy?: Maybe<Scalars['String']['output']>;
  pipelineVersion?: Maybe<Scalars['String']['output']>;
  qcPercent?: Maybe<Scalars['Float']['output']>;
  resultsFinalized?: Maybe<Scalars['Int']['output']>;
  s3OutputPrefix?: Maybe<Scalars['String']['output']>;
  sampleId?: Maybe<Scalars['Int']['output']>;
  sfnExecutionArn?: Maybe<Scalars['String']['output']>;
  subsample?: Maybe<Scalars['Int']['output']>;
  timeToFinalized?: Maybe<Scalars['Int']['output']>;
  timeToResultsFinalized?: Maybe<Scalars['Int']['output']>;
  totalErccReads?: Maybe<Scalars['Int']['output']>;
  totalReads?: Maybe<Scalars['Int']['output']>;
  truncated?: Maybe<Scalars['Int']['output']>;
  unmappedReads?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  useTaxonWhitelist: Scalars['Boolean']['output'];
  wdlVersion?: Maybe<Scalars['String']['output']>;
};

export type Project = {
  backgroundFlag?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  creator?: Maybe<User>;
  daysToKeepSamplePrivate: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  maxInputFragmentsDefault?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  publicAccess: Scalars['Int']['output'];
  samples?: Maybe<Array<Sample>>;
  subsampleDefault?: Maybe<Scalars['Int']['output']>;
  totalSampleCount: Scalars['Int']['output'];
  updatedAt: Scalars['ISO8601DateTime']['output'];
};

export type Sample = {
  alignmentConfigName?: Maybe<Scalars['String']['output']>;
  basespaceAccessToken?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  dagVars?: Maybe<Scalars['String']['output']>;
  defaultBackgroundId?: Maybe<Scalars['Int']['output']>;
  defaultPipelineRunId?: Maybe<Scalars['Int']['output']>;
  details: SampleDetails;
  doNotProcess: Scalars['Boolean']['output'];
  editable?: Maybe<Scalars['Boolean']['output']>;
  hostGenome?: Maybe<HostGenome>;
  hostGenomeId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  initialWorkflow: Scalars['String']['output'];
  maxInputFragments?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  pipelineBranch?: Maybe<Scalars['String']['output']>;
  pipelineCommit?: Maybe<Scalars['String']['output']>;
  pipelineExecutionStrategy?: Maybe<Scalars['String']['output']>;
  pipelineRuns?: Maybe<Array<PipelineRun>>;
  privateUntil?: Maybe<Scalars['ISO8601DateTime']['output']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']['output']>;
  public: Scalars['Int']['output'];
  s3Bowtie2IndexPath?: Maybe<Scalars['String']['output']>;
  s3PreloadResultPath?: Maybe<Scalars['String']['output']>;
  s3StarIndexPath?: Maybe<Scalars['String']['output']>;
  sampleDeletable?: Maybe<Scalars['Boolean']['output']>;
  sampleNotes?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  subsample?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  uploadError?: Maybe<Scalars['String']['output']>;
  uploadedFromBasespace?: Maybe<Scalars['Int']['output']>;
  useTaxonWhitelist: Scalars['Boolean']['output'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['Int']['output']>;
  webCommit?: Maybe<Scalars['String']['output']>;
  workflowRuns?: Maybe<Array<WorkflowRun>>;
};

export type SampleDetails = {
  dbSample?: Maybe<DbSample>;
  derivedSampleOutput?: Maybe<DerivedSampleOutput>;
  metadata?: Maybe<SampleMetadata>;
  mngsRunInfo?: Maybe<MngsRunInfo>;
  uploader: SampleUploader;
  workflowRunsCountByWorkflow?: Maybe<Scalars['String']['output']>;
};

export type SampleList = {
  sampleIds?: Maybe<Array<Scalars['Int']['output']>>;
  samples: Array<Sample>;
};

export type SampleMetadata = {
  collectionDate?: Maybe<Scalars['String']['output']>;
  collectionLocationV2?: Maybe<Scalars['String']['output']>;
  nucleotideType?: Maybe<Scalars['String']['output']>;
  sampleType?: Maybe<Scalars['String']['output']>;
  waterControl?: Maybe<Scalars['String']['output']>;
};

export type SampleReadsStats = {
  initialReads?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pipelineVersion?: Maybe<Scalars['String']['output']>;
  sampleId: Scalars['Int']['output'];
  steps?: Maybe<Array<SampleSteps>>;
  wdlVersion?: Maybe<Scalars['String']['output']>;
};

export type SampleReadsStatsList = {
  sampleReadsStats: Array<SampleReadsStats>;
};

export type SampleSteps = {
  name?: Maybe<Scalars['String']['output']>;
  readsAfter?: Maybe<Scalars['Int']['output']>;
};

export type SampleSummaryStats = {
  adjustedRemainingReads?: Maybe<Scalars['Int']['output']>;
  compressionRatio?: Maybe<Scalars['Float']['output']>;
  insertSizeMean?: Maybe<Scalars['Float']['output']>;
  insertSizeStandardDeviation?: Maybe<Scalars['Float']['output']>;
  lastProcessedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  percentRemaining?: Maybe<Scalars['Float']['output']>;
  qcPercent?: Maybe<Scalars['Float']['output']>;
  readsAfterCzidDedup?: Maybe<Scalars['Int']['output']>;
  readsAfterPriceseq?: Maybe<Scalars['Int']['output']>;
  readsAfterStar?: Maybe<Scalars['Int']['output']>;
  readsAfterTrimmomatic?: Maybe<Scalars['Int']['output']>;
  unmappedReads?: Maybe<Scalars['Int']['output']>;
};

export type SampleUploader = {
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type User = {
  archetypes: Scalars['String']['output'];
  createdByUserId: Scalars['BigInt']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  institution: Scalars['String']['output'];
  name: Scalars['String']['output'];
  role: Scalars['Int']['output'];
  segments: Scalars['String']['output'];
};

export type WorkflowRun = {
  cachedResults?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['ISO8601DateTime']['output'];
  deprecated: Scalars['Boolean']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  executedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  inputsJson?: Maybe<Scalars['String']['output']>;
  rerunFrom?: Maybe<Scalars['Int']['output']>;
  s3OutputPrefix?: Maybe<Scalars['String']['output']>;
  sample?: Maybe<Sample>;
  sampleId?: Maybe<Scalars['Int']['output']>;
  sfnExecutionArn?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  timeToFinalized?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['ISO8601DateTime']['output'];
  wdlVersion?: Maybe<Scalars['String']['output']>;
  workflow: Scalars['String']['output'];
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

export type Background = {
  other_backgrounds?: Maybe<Array<Maybe<query_Background_other_backgrounds_items>>>;
};

export type query_Background_other_backgrounds_items = {
  id?: Maybe<Scalars['JSON']['output']>;
  name?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['JSON']['output']>;
  is_public?: Maybe<Scalars['JSON']['output']>;
  mass_normalized?: Maybe<Scalars['JSON']['output']>;
  owned?: Maybe<Scalars['JSON']['output']>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  AlignmentConfig: ResolverTypeWrapper<AlignmentConfig>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Annotation: Annotation;
  AppConfig: ResolverTypeWrapper<AppConfig>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  CreateUserPayload: ResolverTypeWrapper<CreateUserPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DbSample: ResolverTypeWrapper<DbSample>;
  DerivedSampleOutput: ResolverTypeWrapper<DerivedSampleOutput>;
  HostGenome: ResolverTypeWrapper<HostGenome>;
  ISO8601DateTime: ResolverTypeWrapper<Scalars['ISO8601DateTime']['output']>;
  InputFile: ResolverTypeWrapper<InputFile>;
  MngsRunInfo: ResolverTypeWrapper<MngsRunInfo>;
  Pathogen: ResolverTypeWrapper<Pathogen>;
  PathogenList: ResolverTypeWrapper<PathogenList>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  PipelineRun: ResolverTypeWrapper<PipelineRun>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Project: ResolverTypeWrapper<Project>;
  Sample: ResolverTypeWrapper<Sample>;
  SampleDetails: ResolverTypeWrapper<SampleDetails>;
  SampleList: ResolverTypeWrapper<SampleList>;
  SampleMetadata: ResolverTypeWrapper<SampleMetadata>;
  SampleReadsStats: ResolverTypeWrapper<SampleReadsStats>;
  SampleReadsStatsList: ResolverTypeWrapper<SampleReadsStatsList>;
  SampleSteps: ResolverTypeWrapper<SampleSteps>;
  SampleSummaryStats: ResolverTypeWrapper<SampleSummaryStats>;
  SampleUploader: ResolverTypeWrapper<SampleUploader>;
  User: ResolverTypeWrapper<User>;
  WorkflowRun: ResolverTypeWrapper<WorkflowRun>;
  GeneratedMeshSchema: ResolverTypeWrapper<GeneratedMeshSchema>;
  query_BulkDownload_bulk_download: ResolverTypeWrapper<query_BulkDownload_bulk_download>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  query_BulkDownload_download_type: ResolverTypeWrapper<query_BulkDownload_download_type>;
  PipelineData: ResolverTypeWrapper<PipelineData>;
  query_PipelineData_stages_items: ResolverTypeWrapper<query_PipelineData_stages_items>;
  query_PipelineData_stages_items_steps_items: ResolverTypeWrapper<query_PipelineData_stages_items_steps_items>;
  query_PipelineData_stages_items_steps_items_inputVariables_items: ResolverTypeWrapper<query_PipelineData_stages_items_steps_items_inputVariables_items>;
  query_PipelineData_stages_items_steps_items_outputFiles_items: ResolverTypeWrapper<query_PipelineData_stages_items_steps_items_outputFiles_items>;
  query_PipelineData_edges_items: ResolverTypeWrapper<query_PipelineData_edges_items>;
  query_PipelineData_edges_items_to: ResolverTypeWrapper<query_PipelineData_edges_items_to>;
  query_PipelineData_edges_items_from: ResolverTypeWrapper<query_PipelineData_edges_items_from>;
  query_PipelineData_edges_items_files_items: ResolverTypeWrapper<query_PipelineData_edges_items_files_items>;
  TaxonDist: ResolverTypeWrapper<TaxonDist>;
  query_TaxonDist_merged_NT_NR: ResolverTypeWrapper<query_TaxonDist_merged_NT_NR>;
  query_TaxonDist_NR: ResolverTypeWrapper<query_TaxonDist_NR>;
  query_TaxonDist_NT: ResolverTypeWrapper<query_TaxonDist_NT>;
  Background: ResolverTypeWrapper<Background>;
  query_Background_other_backgrounds_items: ResolverTypeWrapper<query_Background_other_backgrounds_items>;
  mutationInput_UpdateSampleNotes_input_Input: mutationInput_UpdateSampleNotes_input_Input;
  ObjMap: ResolverTypeWrapper<Scalars['ObjMap']['output']>;
  HTTPMethod: HTTPMethod;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Mutation: {};
  AlignmentConfig: AlignmentConfig;
  String: Scalars['String']['output'];
  Int: Scalars['Int']['output'];
  Annotation: Annotation;
  AppConfig: AppConfig;
  BigInt: Scalars['BigInt']['output'];
  CreateUserPayload: CreateUserPayload;
  Boolean: Scalars['Boolean']['output'];
  DbSample: DbSample;
  DerivedSampleOutput: DerivedSampleOutput;
  HostGenome: HostGenome;
  ISO8601DateTime: Scalars['ISO8601DateTime']['output'];
  InputFile: InputFile;
  MngsRunInfo: MngsRunInfo;
  Pathogen: Pathogen;
  PathogenList: PathogenList;
  ID: Scalars['ID']['output'];
  PipelineRun: PipelineRun;
  Float: Scalars['Float']['output'];
  Project: Project;
  Sample: Sample;
  SampleDetails: SampleDetails;
  SampleList: SampleList;
  SampleMetadata: SampleMetadata;
  SampleReadsStats: SampleReadsStats;
  SampleReadsStatsList: SampleReadsStatsList;
  SampleSteps: SampleSteps;
  SampleSummaryStats: SampleSummaryStats;
  SampleUploader: SampleUploader;
  User: User;
  WorkflowRun: WorkflowRun;
  GeneratedMeshSchema: GeneratedMeshSchema;
  query_BulkDownload_bulk_download: query_BulkDownload_bulk_download;
  JSON: Scalars['JSON']['output'];
  query_BulkDownload_download_type: query_BulkDownload_download_type;
  PipelineData: PipelineData;
  query_PipelineData_stages_items: query_PipelineData_stages_items;
  query_PipelineData_stages_items_steps_items: query_PipelineData_stages_items_steps_items;
  query_PipelineData_stages_items_steps_items_inputVariables_items: query_PipelineData_stages_items_steps_items_inputVariables_items;
  query_PipelineData_stages_items_steps_items_outputFiles_items: query_PipelineData_stages_items_steps_items_outputFiles_items;
  query_PipelineData_edges_items: query_PipelineData_edges_items;
  query_PipelineData_edges_items_to: query_PipelineData_edges_items_to;
  query_PipelineData_edges_items_from: query_PipelineData_edges_items_from;
  query_PipelineData_edges_items_files_items: query_PipelineData_edges_items_files_items;
  TaxonDist: TaxonDist;
  query_TaxonDist_merged_NT_NR: query_TaxonDist_merged_NT_NR;
  query_TaxonDist_NR: query_TaxonDist_NR;
  query_TaxonDist_NT: query_TaxonDist_NT;
  Background: Background;
  query_Background_other_backgrounds_items: query_Background_other_backgrounds_items;
  mutationInput_UpdateSampleNotes_input_Input: mutationInput_UpdateSampleNotes_input_Input;
  ObjMap: Scalars['ObjMap']['output'];
}>;

export type exampleDirectiveArgs = {
  value?: Maybe<Scalars['ObjMap']['input']>;
};

export type exampleDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = exampleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type globalOptionsDirectiveArgs = {
  sourceName?: Maybe<Scalars['String']['input']>;
  endpoint?: Maybe<Scalars['String']['input']>;
  operationHeaders?: Maybe<Scalars['ObjMap']['input']>;
  queryStringOptions?: Maybe<Scalars['ObjMap']['input']>;
  queryParams?: Maybe<Scalars['ObjMap']['input']>;
};

export type globalOptionsDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = globalOptionsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type httpOperationDirectiveArgs = {
  path?: Maybe<Scalars['String']['input']>;
  operationSpecificHeaders?: Maybe<Scalars['ObjMap']['input']>;
  httpMethod?: Maybe<HTTPMethod>;
  isBinary?: Maybe<Scalars['Boolean']['input']>;
  requestBaseBody?: Maybe<Scalars['ObjMap']['input']>;
  queryParamArgMap?: Maybe<Scalars['ObjMap']['input']>;
  queryStringOptionsByParam?: Maybe<Scalars['ObjMap']['input']>;
};

export type httpOperationDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = httpOperationDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  appConfig?: Resolver<Maybe<ResolversTypes['AppConfig']>, ParentType, ContextType, RequireFields<QueryappConfigArgs, 'id'>>;
  pathogenList?: Resolver<ResolversTypes['PathogenList'], ParentType, ContextType, Partial<QuerypathogenListArgs>>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<QueryprojectArgs, 'id'>>;
  sample?: Resolver<ResolversTypes['Sample'], ParentType, ContextType, RequireFields<QuerysampleArgs, 'sampleId'>>;
  sampleReadsStats?: Resolver<ResolversTypes['SampleReadsStatsList'], ParentType, ContextType, RequireFields<QuerysampleReadsStatsArgs, 'sampleIds'>>;
  samplesList?: Resolver<ResolversTypes['SampleList'], ParentType, ContextType, Partial<QuerysamplesListArgs>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryuserArgs, 'archetypes' | 'email' | 'institution' | 'name' | 'role' | 'segments'>>;
  BulkDownload?: Resolver<Maybe<ResolversTypes['GeneratedMeshSchema']>, ParentType, ContextType, Partial<QueryBulkDownloadArgs>>;
  PipelineData?: Resolver<Maybe<ResolversTypes['PipelineData']>, ParentType, ContextType, Partial<QueryPipelineDataArgs>>;
  TaxonDist?: Resolver<Maybe<ResolversTypes['TaxonDist']>, ParentType, ContextType, Partial<QueryTaxonDistArgs>>;
  Background?: Resolver<Maybe<ResolversTypes['Background']>, ParentType, ContextType, Partial<QueryBackgroundArgs>>;
}>;

export type MutationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<ResolversTypes['CreateUserPayload'], ParentType, ContextType, RequireFields<MutationcreateUserArgs, 'email'>>;
  UpdateSampleNotes?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, Partial<MutationUpdateSampleNotesArgs>>;
}>;

export type AlignmentConfigResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AlignmentConfig'] = ResolversParentTypes['AlignmentConfig']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['ISO8601DateTime'], ParentType, ContextType>;
  indexDirSuffix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lineageVersion?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lineageVersionOld?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3Accession2taxidPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3DeuterostomeDbPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3LineagePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3NrDbPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3NrLocDbPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3NtDbPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3NtInfoDbPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3NtLocDbPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3TaxonBlacklistPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['ISO8601DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AppConfigResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['AppConfig'] = ResolversParentTypes['AppConfig']> = ResolversObject<{
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type CreateUserPayloadResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['CreateUserPayload'] = ResolversParentTypes['CreateUserPayload']> = ResolversObject<{
  archetypes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  institution?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  segments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sendActivation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DbSampleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DbSample'] = ResolversParentTypes['DbSample']> = ResolversObject<{
  alignmentConfigName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  basespaceAccessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  clientUpdatedAt?: Resolver<Maybe<ResolversTypes['ISO8601DateTime']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['ISO8601DateTime'], ParentType, ContextType>;
  dagVars?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  doNotProcess?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hostGenomeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hostGenomeName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  initialWorkflow?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inputFiles?: Resolver<Array<ResolversTypes['InputFile']>, ParentType, ContextType>;
  maxInputFragments?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pipelineBranch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pipelineCommit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pipelineExecutionStrategy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  privateUntil?: Resolver<Maybe<ResolversTypes['ISO8601DateTime']>, ParentType, ContextType>;
  projectId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  s3Bowtie2IndexPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3PreloadResultPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3StarIndexPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subsample?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['ISO8601DateTime'], ParentType, ContextType>;
  uploadError?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uploadedFromBasespace?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  useTaxonWhitelist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  webCommit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DerivedSampleOutputResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DerivedSampleOutput'] = ResolversParentTypes['DerivedSampleOutput']> = ResolversObject<{
  hostGenomeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pipelineRun?: Resolver<Maybe<ResolversTypes['PipelineRun']>, ParentType, ContextType>;
  projectName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summaryStats?: Resolver<Maybe<ResolversTypes['SampleSummaryStats']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HostGenomeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['HostGenome'] = ResolversParentTypes['HostGenome']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['ISO8601DateTime'], ParentType, ContextType>;
  defaultBackgroundId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  s3Bowtie2IndexPath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  s3Minimap2IndexPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3StarIndexPath?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  samplesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  skipDeuteroFilter?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  taxaCategory?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['ISO8601DateTime'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface ISO8601DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ISO8601DateTime'], any> {
  name: 'ISO8601DateTime';
}

export type InputFileResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['InputFile'] = ResolversParentTypes['InputFile']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['ISO8601DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parts?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  presignedUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sourceType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['ISO8601DateTime']>, ParentType, ContextType>;
  uploadClient?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MngsRunInfoResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MngsRunInfo'] = ResolversParentTypes['MngsRunInfo']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['ISO8601DateTime']>, ParentType, ContextType>;
  finalized?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  reportReady?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  resultStatusDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalRuntime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  withAssembly?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PathogenResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Pathogen'] = ResolversParentTypes['Pathogen']> = ResolversObject<{
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  taxId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PathogenListResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PathogenList'] = ResolversParentTypes['PathogenList']> = ResolversObject<{
  citations?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['ISO8601DateTime']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pathogens?: Resolver<Maybe<Array<ResolversTypes['Pathogen']>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['ISO8601DateTime']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PipelineRunResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PipelineRun'] = ResolversParentTypes['PipelineRun']> = ResolversObject<{
  adjustedRemainingReads?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  alertSent?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  alignmentConfig?: Resolver<Maybe<ResolversTypes['AlignmentConfig']>, ParentType, ContextType>;
  alignmentConfigId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  alignmentConfigName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  assembled?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  compressionRatio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['ISO8601DateTime']>, ParentType, ContextType>;
  dagVars?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deprecated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  executedAt?: Resolver<Maybe<ResolversTypes['ISO8601DateTime']>, ParentType, ContextType>;
  finalized?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fractionSubsampled?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  jobStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  knownUserError?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxInputFragments?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pipelineBranch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pipelineCommit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pipelineExecutionStrategy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pipelineVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qcPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  resultsFinalized?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  s3OutputPrefix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sfnExecutionArn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subsample?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timeToFinalized?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timeToResultsFinalized?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalErccReads?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalReads?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  truncated?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  unmappedReads?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['ISO8601DateTime'], ParentType, ContextType>;
  useTaxonWhitelist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  wdlVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = ResolversObject<{
  backgroundFlag?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['ISO8601DateTime'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  daysToKeepSamplePrivate?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  maxInputFragmentsDefault?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  publicAccess?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  samples?: Resolver<Maybe<Array<ResolversTypes['Sample']>>, ParentType, ContextType>;
  subsampleDefault?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalSampleCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['ISO8601DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SampleResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Sample'] = ResolversParentTypes['Sample']> = ResolversObject<{
  alignmentConfigName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  basespaceAccessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['ISO8601DateTime']>, ParentType, ContextType>;
  dagVars?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  defaultBackgroundId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  defaultPipelineRunId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  details?: Resolver<ResolversTypes['SampleDetails'], ParentType, ContextType>;
  doNotProcess?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  editable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hostGenome?: Resolver<Maybe<ResolversTypes['HostGenome']>, ParentType, ContextType>;
  hostGenomeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  initialWorkflow?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  maxInputFragments?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pipelineBranch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pipelineCommit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pipelineExecutionStrategy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pipelineRuns?: Resolver<Maybe<Array<ResolversTypes['PipelineRun']>>, ParentType, ContextType>;
  privateUntil?: Resolver<Maybe<ResolversTypes['ISO8601DateTime']>, ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  projectId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  public?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  s3Bowtie2IndexPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3PreloadResultPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3StarIndexPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleDeletable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sampleNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subsample?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['ISO8601DateTime']>, ParentType, ContextType>;
  uploadError?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uploadedFromBasespace?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  useTaxonWhitelist?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  webCommit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workflowRuns?: Resolver<Maybe<Array<ResolversTypes['WorkflowRun']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SampleDetailsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SampleDetails'] = ResolversParentTypes['SampleDetails']> = ResolversObject<{
  dbSample?: Resolver<Maybe<ResolversTypes['DbSample']>, ParentType, ContextType>;
  derivedSampleOutput?: Resolver<Maybe<ResolversTypes['DerivedSampleOutput']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['SampleMetadata']>, ParentType, ContextType>;
  mngsRunInfo?: Resolver<Maybe<ResolversTypes['MngsRunInfo']>, ParentType, ContextType>;
  uploader?: Resolver<ResolversTypes['SampleUploader'], ParentType, ContextType>;
  workflowRunsCountByWorkflow?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SampleListResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SampleList'] = ResolversParentTypes['SampleList']> = ResolversObject<{
  sampleIds?: Resolver<Maybe<Array<ResolversTypes['Int']>>, ParentType, ContextType>;
  samples?: Resolver<Array<ResolversTypes['Sample']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SampleMetadataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SampleMetadata'] = ResolversParentTypes['SampleMetadata']> = ResolversObject<{
  collectionDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  collectionLocationV2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nucleotideType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  waterControl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SampleReadsStatsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SampleReadsStats'] = ResolversParentTypes['SampleReadsStats']> = ResolversObject<{
  initialReads?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pipelineVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  steps?: Resolver<Maybe<Array<ResolversTypes['SampleSteps']>>, ParentType, ContextType>;
  wdlVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SampleReadsStatsListResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SampleReadsStatsList'] = ResolversParentTypes['SampleReadsStatsList']> = ResolversObject<{
  sampleReadsStats?: Resolver<Array<ResolversTypes['SampleReadsStats']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SampleStepsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SampleSteps'] = ResolversParentTypes['SampleSteps']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  readsAfter?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SampleSummaryStatsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SampleSummaryStats'] = ResolversParentTypes['SampleSummaryStats']> = ResolversObject<{
  adjustedRemainingReads?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  compressionRatio?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  insertSizeMean?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  insertSizeStandardDeviation?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  lastProcessedAt?: Resolver<Maybe<ResolversTypes['ISO8601DateTime']>, ParentType, ContextType>;
  percentRemaining?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  qcPercent?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  readsAfterCzidDedup?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  readsAfterPriceseq?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  readsAfterStar?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  readsAfterTrimmomatic?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  unmappedReads?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SampleUploaderResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SampleUploader'] = ResolversParentTypes['SampleUploader']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  archetypes?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdByUserId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  institution?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  segments?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkflowRunResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['WorkflowRun'] = ResolversParentTypes['WorkflowRun']> = ResolversObject<{
  cachedResults?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['ISO8601DateTime'], ParentType, ContextType>;
  deprecated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errorMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  executedAt?: Resolver<Maybe<ResolversTypes['ISO8601DateTime']>, ParentType, ContextType>;
  inputsJson?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rerunFrom?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  s3OutputPrefix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sample?: Resolver<Maybe<ResolversTypes['Sample']>, ParentType, ContextType>;
  sampleId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sfnExecutionArn?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timeToFinalized?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['ISO8601DateTime'], ParentType, ContextType>;
  wdlVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  workflow?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GeneratedMeshSchemaResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['GeneratedMeshSchema'] = ResolversParentTypes['GeneratedMeshSchema']> = ResolversObject<{
  bulk_download?: Resolver<Maybe<ResolversTypes['query_BulkDownload_bulk_download']>, ParentType, ContextType>;
  download_type?: Resolver<Maybe<ResolversTypes['query_BulkDownload_download_type']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type query_BulkDownload_bulk_downloadResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['query_BulkDownload_bulk_download'] = ResolversParentTypes['query_BulkDownload_bulk_download']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  params_json?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  download_type?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  error_message?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  progress?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  ecs_task_arn?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  output_file_size?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  deleted_at?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  analysis_type?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  analysis_count?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  num_samples?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  download_name?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  file_size?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  user_name?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  execution_type?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  log_url?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  params?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  pipeline_runs?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  workflow_runs?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  presigned_output_url?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface JSONScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type query_BulkDownload_download_typeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['query_BulkDownload_download_type'] = ResolversParentTypes['query_BulkDownload_download_type']> = ResolversObject<{
  type?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  display_name?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  execution_type?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  fields?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  file_type_display?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  workflows?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PipelineDataResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PipelineData'] = ResolversParentTypes['PipelineData']> = ResolversObject<{
  stages?: Resolver<Maybe<Array<Maybe<ResolversTypes['query_PipelineData_stages_items']>>>, ParentType, ContextType>;
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['query_PipelineData_edges_items']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type query_PipelineData_stages_itemsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['query_PipelineData_stages_items'] = ResolversParentTypes['query_PipelineData_stages_items']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  steps?: Resolver<Maybe<Array<Maybe<ResolversTypes['query_PipelineData_stages_items_steps_items']>>>, ParentType, ContextType>;
  jobStatus?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type query_PipelineData_stages_items_steps_itemsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['query_PipelineData_stages_items_steps_items'] = ResolversParentTypes['query_PipelineData_stages_items_steps_items']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  inputVariables?: Resolver<Maybe<Array<Maybe<ResolversTypes['query_PipelineData_stages_items_steps_items_inputVariables_items']>>>, ParentType, ContextType>;
  outputFiles?: Resolver<Maybe<Array<Maybe<ResolversTypes['query_PipelineData_stages_items_steps_items_outputFiles_items']>>>, ParentType, ContextType>;
  inputEdges?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType>;
  outputEdges?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  resources?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type query_PipelineData_stages_items_steps_items_inputVariables_itemsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['query_PipelineData_stages_items_steps_items_inputVariables_items'] = ResolversParentTypes['query_PipelineData_stages_items_steps_items_inputVariables_items']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type query_PipelineData_stages_items_steps_items_outputFiles_itemsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['query_PipelineData_stages_items_steps_items_outputFiles_items'] = ResolversParentTypes['query_PipelineData_stages_items_steps_items_outputFiles_items']> = ResolversObject<{
  displayName?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type query_PipelineData_edges_itemsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['query_PipelineData_edges_items'] = ResolversParentTypes['query_PipelineData_edges_items']> = ResolversObject<{
  to?: Resolver<Maybe<ResolversTypes['query_PipelineData_edges_items_to']>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['query_PipelineData_edges_items_from']>, ParentType, ContextType>;
  files?: Resolver<Maybe<Array<Maybe<ResolversTypes['query_PipelineData_edges_items_files_items']>>>, ParentType, ContextType>;
  isIntraStage?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type query_PipelineData_edges_items_toResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['query_PipelineData_edges_items_to'] = ResolversParentTypes['query_PipelineData_edges_items_to']> = ResolversObject<{
  stageIndex?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  stepIndex?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type query_PipelineData_edges_items_fromResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['query_PipelineData_edges_items_from'] = ResolversParentTypes['query_PipelineData_edges_items_from']> = ResolversObject<{
  stageIndex?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  stepIndex?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type query_PipelineData_edges_items_files_itemsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['query_PipelineData_edges_items_files_items'] = ResolversParentTypes['query_PipelineData_edges_items_files_items']> = ResolversObject<{
  displayName?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TaxonDistResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TaxonDist'] = ResolversParentTypes['TaxonDist']> = ResolversObject<{
  merged_NT_NR?: Resolver<Maybe<ResolversTypes['query_TaxonDist_merged_NT_NR']>, ParentType, ContextType>;
  NR?: Resolver<Maybe<ResolversTypes['query_TaxonDist_NR']>, ParentType, ContextType>;
  NT?: Resolver<Maybe<ResolversTypes['query_TaxonDist_NT']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type query_TaxonDist_merged_NT_NRResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['query_TaxonDist_merged_NT_NR'] = ResolversParentTypes['query_TaxonDist_merged_NT_NR']> = ResolversObject<{
  tax_level?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  mean?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  stdev?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  rpm_list?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type query_TaxonDist_NRResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['query_TaxonDist_NR'] = ResolversParentTypes['query_TaxonDist_NR']> = ResolversObject<{
  tax_level?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  mean?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  stdev?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  rpm_list?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type query_TaxonDist_NTResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['query_TaxonDist_NT'] = ResolversParentTypes['query_TaxonDist_NT']> = ResolversObject<{
  tax_level?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  mean?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  stdev?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  rpm_list?: Resolver<Maybe<Array<Maybe<ResolversTypes['JSON']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BackgroundResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Background'] = ResolversParentTypes['Background']> = ResolversObject<{
  other_backgrounds?: Resolver<Maybe<Array<Maybe<ResolversTypes['query_Background_other_backgrounds_items']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type query_Background_other_backgrounds_itemsResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['query_Background_other_backgrounds_items'] = ResolversParentTypes['query_Background_other_backgrounds_items']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  is_public?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  mass_normalized?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  owned?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface ObjMapScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjMap'], any> {
  name: 'ObjMap';
}

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  AlignmentConfig?: AlignmentConfigResolvers<ContextType>;
  AppConfig?: AppConfigResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  CreateUserPayload?: CreateUserPayloadResolvers<ContextType>;
  DbSample?: DbSampleResolvers<ContextType>;
  DerivedSampleOutput?: DerivedSampleOutputResolvers<ContextType>;
  HostGenome?: HostGenomeResolvers<ContextType>;
  ISO8601DateTime?: GraphQLScalarType;
  InputFile?: InputFileResolvers<ContextType>;
  MngsRunInfo?: MngsRunInfoResolvers<ContextType>;
  Pathogen?: PathogenResolvers<ContextType>;
  PathogenList?: PathogenListResolvers<ContextType>;
  PipelineRun?: PipelineRunResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Sample?: SampleResolvers<ContextType>;
  SampleDetails?: SampleDetailsResolvers<ContextType>;
  SampleList?: SampleListResolvers<ContextType>;
  SampleMetadata?: SampleMetadataResolvers<ContextType>;
  SampleReadsStats?: SampleReadsStatsResolvers<ContextType>;
  SampleReadsStatsList?: SampleReadsStatsListResolvers<ContextType>;
  SampleSteps?: SampleStepsResolvers<ContextType>;
  SampleSummaryStats?: SampleSummaryStatsResolvers<ContextType>;
  SampleUploader?: SampleUploaderResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  WorkflowRun?: WorkflowRunResolvers<ContextType>;
  GeneratedMeshSchema?: GeneratedMeshSchemaResolvers<ContextType>;
  query_BulkDownload_bulk_download?: query_BulkDownload_bulk_downloadResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  query_BulkDownload_download_type?: query_BulkDownload_download_typeResolvers<ContextType>;
  PipelineData?: PipelineDataResolvers<ContextType>;
  query_PipelineData_stages_items?: query_PipelineData_stages_itemsResolvers<ContextType>;
  query_PipelineData_stages_items_steps_items?: query_PipelineData_stages_items_steps_itemsResolvers<ContextType>;
  query_PipelineData_stages_items_steps_items_inputVariables_items?: query_PipelineData_stages_items_steps_items_inputVariables_itemsResolvers<ContextType>;
  query_PipelineData_stages_items_steps_items_outputFiles_items?: query_PipelineData_stages_items_steps_items_outputFiles_itemsResolvers<ContextType>;
  query_PipelineData_edges_items?: query_PipelineData_edges_itemsResolvers<ContextType>;
  query_PipelineData_edges_items_to?: query_PipelineData_edges_items_toResolvers<ContextType>;
  query_PipelineData_edges_items_from?: query_PipelineData_edges_items_fromResolvers<ContextType>;
  query_PipelineData_edges_items_files_items?: query_PipelineData_edges_items_files_itemsResolvers<ContextType>;
  TaxonDist?: TaxonDistResolvers<ContextType>;
  query_TaxonDist_merged_NT_NR?: query_TaxonDist_merged_NT_NRResolvers<ContextType>;
  query_TaxonDist_NR?: query_TaxonDist_NRResolvers<ContextType>;
  query_TaxonDist_NT?: query_TaxonDist_NTResolvers<ContextType>;
  Background?: BackgroundResolvers<ContextType>;
  query_Background_other_backgrounds_items?: query_Background_other_backgrounds_itemsResolvers<ContextType>;
  ObjMap?: GraphQLScalarType;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  example?: exampleDirectiveResolver<any, any, ContextType>;
  globalOptions?: globalOptionsDirectiveResolver<any, any, ContextType>;
  httpOperation?: httpOperationDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = CzidgqlTypes.Context & CzidrestTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".mesh/sources/CZIDGQL/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    case ".mesh/sources/CZIDREST/schemaWithAnnotations":
      return Promise.resolve(importedModule$1) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = {"port":4444,"endpoint":"/graphqlfed"} as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("🕸️  Mesh");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const czidgqlTransforms = [];
const czidrestTransforms = [];
const additionalTypeDefs = [] as any[];
const czidgqlHandler = new GraphqlHandler({
              name: "CZIDGQL",
              config: {"endpoint":"http://web:3000/graphql","source":"./sources/czid-schema.graphql","operationHeaders":{"Cookie":"{context.headers['cookie']}"}},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("CZIDGQL"),
              logger: logger.child("CZIDGQL"),
              importFn,
            });
const czidrestHandler = new JsonSchemaHandler({
              name: "CZIDREST",
              config: {"endpoint":"http://web:3000/","operations":[{"type":"Query","field":"BulkDownload","path":"/bulk_downloads/{args.bulkDownloadId}","method":"GET","responseSchema":"./json-schemas/bulkDownloads.json","responseTypeName":"BulkDownload","headers":{"Cookie":"{context.headers['cookie']}"}},{"type":"Query","field":"PipelineData","path":"/samples/{args.sampleId}/pipeline_viz/7.0.json","method":"GET","responseSchema":"./json-schemas/pipelineData.json","responseTypeName":"PipelineData","headers":{"Cookie":"{context.headers['cookie']}"}},{"type":"Query","field":"TaxonDist","path":"/backgrounds/{args.backgroundId}/show_taxon_dist.json?taxid={args.taxonId}","method":"GET","responseSchema":"./json-schemas/taxonDist.json","responseTypeName":"TaxonDist","headers":{"Cookie":"{context.headers['cookie']}"}},{"type":"Query","field":"Background","path":"/pub/{args.snapshotShareId}/backgrounds.json","method":"GET","responseSchema":"./json-schemas/snapshotBackground.json","responseTypeName":"Background","headers":{"Cookie":"{context.headers['cookie']}"},"transforms":[{"resolverComposition":{"composition":[{"composer":"transforms#snapshotShareBackgroundResolver","resolver":"accession_coverage_stats_resolver"}]}}]},{"type":"Mutation","field":"UpdateSampleNotes","path":"/samples/{args.sampleId}/save_metadata","method":"POST","requestSample":{"value":"test","field":"notes","authenticityToken":"test"},"responseSchema":"./json-schemas/updateSampleNotes.json","responseTypeName":"UpdateSampleNotes","headers":{"Cookie":"{context.headers['cookie']}"}}]},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("CZIDREST"),
              logger: logger.child("CZIDREST"),
              importFn,
            });
sources[0] = {
          name: 'CZIDGQL',
          handler: czidgqlHandler,
          transforms: czidgqlTransforms
        }
sources[1] = {
          name: 'CZIDREST',
          handler: czidrestHandler,
          transforms: czidrestTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(StitchingMerger as any)({
        cache,
        pubsub,
        logger: logger.child('stitchingMerger'),
        store: rootStore.child('stitchingMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltMesh,
    rawServeConfig: {"port":4444,"endpoint":"/graphqlfed"},
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltMesh(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltMesh().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltMesh().then(({ subscribe }) => subscribe(...args));