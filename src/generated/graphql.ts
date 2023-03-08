import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Project = {
  __typename?: 'Project';
  background_flag?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['String']>;
  days_to_keep_sample_private?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  max_input_fragments_default?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  public_access?: Maybe<Scalars['Int']>;
  subsample_default?: Maybe<Scalars['Int']>;
  total_sample_count?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  project?: Maybe<Project>;
  projects?: Maybe<Array<Maybe<Project>>>;
  sample?: Maybe<Sample>;
  taxonDescription?: Maybe<Array<Maybe<TaxonDescription>>>;
  taxonDist?: Maybe<TaxonDist>;
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};


export type QuerySampleArgs = {
  sampleId: Scalars['Int'];
};


export type QueryTaxonDescriptionArgs = {
  taxonIdList?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryTaxonDistArgs = {
  backgroundId: Scalars['Int'];
  taxId: Scalars['Int'];
};

export type Sample = {
  __typename?: 'Sample';
  alignmentConfigName?: Maybe<Scalars['String']>;
  basespaceAccessToken?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  dagVars?: Maybe<Scalars['String']>;
  defaultBackgroundId?: Maybe<Scalars['Int']>;
  doNotProcess?: Maybe<Scalars['Boolean']>;
  hostGenomeId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  initialWorkflow?: Maybe<Scalars['String']>;
  maxInputFragments?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  pipelineBranch?: Maybe<Scalars['String']>;
  pipelineCommit?: Maybe<Scalars['String']>;
  pipelineExecutionStrategy?: Maybe<Scalars['String']>;
  privateUntil?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['Int']>;
  s3Bowtie2IndexPath?: Maybe<Scalars['String']>;
  s3PreloadResultPath?: Maybe<Scalars['String']>;
  s3StarIndexPath?: Maybe<Scalars['String']>;
  sampleNotes?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  subsample?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['String']>;
  uploadError?: Maybe<Scalars['String']>;
  uploadedFromBasespace?: Maybe<Scalars['Int']>;
  useTaxonWhitelist?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['Int']>;
  webCommit?: Maybe<Scalars['String']>;
};

export type TaxonDescription = {
  __typename?: 'TaxonDescription';
  summary?: Maybe<Scalars['String']>;
  taxId?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  wikiUrl?: Maybe<Scalars['String']>;
};

export type TaxonDist = {
  __typename?: 'TaxonDist';
  mergedNtNr?: Maybe<TaxonDistributionObject>;
  nr?: Maybe<TaxonDistributionObject>;
  nt?: Maybe<TaxonDistributionObject>;
};

export type TaxonDistributionObject = {
  __typename?: 'TaxonDistributionObject';
  mean?: Maybe<Scalars['Float']>;
  rpmList?: Maybe<Array<Maybe<Scalars['Float']>>>;
  stdev?: Maybe<Scalars['Float']>;
  taxLevel?: Maybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Project: ResolverTypeWrapper<Project>;
  Query: ResolverTypeWrapper<{}>;
  Sample: ResolverTypeWrapper<Sample>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TaxonDescription: ResolverTypeWrapper<TaxonDescription>;
  TaxonDist: ResolverTypeWrapper<TaxonDist>;
  TaxonDistributionObject: ResolverTypeWrapper<TaxonDistributionObject>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  Project: Project;
  Query: {};
  Sample: Sample;
  String: Scalars['String'];
  TaxonDescription: TaxonDescription;
  TaxonDist: TaxonDist;
  TaxonDistributionObject: TaxonDistributionObject;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  background_flag?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  days_to_keep_sample_private?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  max_input_fragments_default?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  public_access?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  subsample_default?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total_sample_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectArgs, 'id'>>;
  projects?: Resolver<Maybe<Array<Maybe<ResolversTypes['Project']>>>, ParentType, ContextType>;
  sample?: Resolver<Maybe<ResolversTypes['Sample']>, ParentType, ContextType, RequireFields<QuerySampleArgs, 'sampleId'>>;
  taxonDescription?: Resolver<Maybe<Array<Maybe<ResolversTypes['TaxonDescription']>>>, ParentType, ContextType, Partial<QueryTaxonDescriptionArgs>>;
  taxonDist?: Resolver<Maybe<ResolversTypes['TaxonDist']>, ParentType, ContextType, RequireFields<QueryTaxonDistArgs, 'backgroundId' | 'taxId'>>;
};

export type SampleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sample'] = ResolversParentTypes['Sample']> = {
  alignmentConfigName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  basespaceAccessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dagVars?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  defaultBackgroundId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  doNotProcess?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hostGenomeId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  initialWorkflow?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxInputFragments?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pipelineBranch?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pipelineCommit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pipelineExecutionStrategy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  privateUntil?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  projectId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  s3Bowtie2IndexPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3PreloadResultPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  s3StarIndexPath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sampleNotes?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subsample?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uploadError?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  uploadedFromBasespace?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  useTaxonWhitelist?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  webCommit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxonDescriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxonDescription'] = ResolversParentTypes['TaxonDescription']> = {
  summary?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  taxId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wikiUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxonDistResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxonDist'] = ResolversParentTypes['TaxonDist']> = {
  mergedNtNr?: Resolver<Maybe<ResolversTypes['TaxonDistributionObject']>, ParentType, ContextType>;
  nr?: Resolver<Maybe<ResolversTypes['TaxonDistributionObject']>, ParentType, ContextType>;
  nt?: Resolver<Maybe<ResolversTypes['TaxonDistributionObject']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaxonDistributionObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaxonDistributionObject'] = ResolversParentTypes['TaxonDistributionObject']> = {
  mean?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  rpmList?: Resolver<Maybe<Array<Maybe<ResolversTypes['Float']>>>, ParentType, ContextType>;
  stdev?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  taxLevel?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Sample?: SampleResolvers<ContextType>;
  TaxonDescription?: TaxonDescriptionResolvers<ContextType>;
  TaxonDist?: TaxonDistResolvers<ContextType>;
  TaxonDistributionObject?: TaxonDistributionObjectResolvers<ContextType>;
};

