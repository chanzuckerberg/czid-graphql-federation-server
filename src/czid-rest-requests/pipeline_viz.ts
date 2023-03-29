import { makeCZIDRestRequest, toCamelCase } from "../helpers.js";

export const fetchPipelineData = async (parent, args, contextValue, info) => {
  const { sampleId, pipelineVersion } = args;
  const requestHeaders = contextValue.headers;
  const res = await makeCZIDRestRequest(
    `samples/${sampleId}/pipeline_viz/${pipelineVersion}.json`,
    requestHeaders
  );
  const output = await res.json();
  const transformedOutput = transform(toCamelCase(output));
  return transformedOutput;
};

const transform = (data) => {
  const transformedData = data
  return transformedData;
};
