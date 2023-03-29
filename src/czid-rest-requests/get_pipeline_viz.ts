import { PipelineData } from "../generated/graphql.js";
import { makeCZIDRestRequest, toCamelCase } from "../helpers.js";

export const fetchPipelineData = async (parent, args, contextValue, info) => {
  const { sampleId, pipelineVersion } = args;
  const requestHeaders = contextValue.headers;
  const res = await makeCZIDRestRequest(
    `samples/${sampleId}/pipeline_viz/${pipelineVersion}.json`,
    requestHeaders
  );
  const output: PipelineDataApiResponse =
    (await res.json()) as PipelineDataApiResponse;
  const transformedOutput: PipelineData = transform(toCamelCase(output));
  return transformedOutput;
};

const transform = (data: PipelineDataApiResponse): PipelineData => {
  const transformedData = data;
  return transformedData;
};

interface Variable {
  name: string;
  type: string;
}

interface OutputFile {
  displayName: string;
  url: string | null;
}

interface Step {
  name: string;
  description: string;
  inputVariables: Variable[];
  outputFiles: OutputFile[];
  inputEdges: number[];
  outputEdges: number[];
  status: string;
  startTime: string | null;
  endTime: string | null;
  resources: any[];
}

interface Stage {
  name: string;
  steps: Step[];
  jobStatus: string;
}

interface PipelineDataApiResponse {
  stages: Stage[];
  status: string;
}
