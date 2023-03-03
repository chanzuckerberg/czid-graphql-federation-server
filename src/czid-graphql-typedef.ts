export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Project {
    id: Int
    name: String
    createdAt: String
    updated_at: String
    public_access: Int
    days_to_keep_sample_private: Int
    background_flag: Int
    description: String
    subsample_default: Int
    max_input_fragments_default: Int
    total_sample_count: Int
    # creator: Types::UserType, null: true
    # samples: [Types::SampleType], null: true
  }

  type Sample {
    id: Int
    name: String
    createdAt: String
    updatedAt: String
    privateUntil: String
    projectId: Int
    status: String
    sampleNotes: String
    s3PreloadResultPath: String
    s3StarIndexPath: String
    s3Bowtie2IndexPath: String
    hostGenomeId: Int
    userId: Int
    subsample: Int
    pipelineBranch: String
    alignmentConfigName: String
    webCommit: String
    pipelineCommit: String
    dagVars: String
    maxInputFragments: Int
    uploadedFromBasespace: Int
    uploadError: String
    basespaceAccessToken: String
    doNotProcess: Boolean
    pipelineExecutionStrategy: String
    useTaxonWhitelist: Boolean
    initialWorkflow: String
    defaultBackgroundId: Int
  }

  type TaxonDistributionObject {
    taxLevel: Int
    mean: Float
    stdev: Float
    rpmList: [Float]
  }

  type TaxonDist {
    mergedNtNr: TaxonDistributionObject
    nr: TaxonDistributionObject
    nt: TaxonDistributionObject
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    project(id: Int!): Project
    projects: [Project]
    sample(sampleId: Int!): Sample
    taxonDist(backgroundId: Int!, taxId: Int!): TaxonDist
}
`;