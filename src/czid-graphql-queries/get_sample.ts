import { gql } from "graphql-request";
import { makeCZIDGraphQLRequest } from "./helpers.js";

export const fetchSample = async (parent, args, contextValue, info) => {
  const sampleId = args.sampleId;
  const requestHeaders = contextValue.headers;
  const query = gql`
    query GetSample($sampleId: Int!) {
      sample(sampleId: $sampleId) {
        id
        name
        createdAt
        updatedAt
        privateUntil
        projectId
        status
        sampleNotes
        s3PreloadResultPath
        s3StarIndexPath
        s3Bowtie2IndexPath
        hostGenomeId
        userId
        subsample
        pipelineBranch
        alignmentConfigName
        webCommit
        pipelineCommit
        dagVars
        maxInputFragments
        uploadedFromBasespace
        uploadError
        basespaceAccessToken
        doNotProcess
        pipelineExecutionStrategy
        useTaxonWhitelist
        initialWorkflow
        defaultBackgroundId
      }
    }
  `;
  const res = await makeCZIDGraphQLRequest(
    query,
    { sampleId: parseInt(sampleId) },
    requestHeaders
  );
  return res.sample;
};
