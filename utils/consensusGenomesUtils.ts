import { InputMaybe, queryInput_consensusGenomes_input_Input } from "../.mesh";

export function getConsensusGenomesWhereParams(
  input: InputMaybe<queryInput_consensusGenomes_input_Input> | undefined
): {
  [s: string]: unknown;
} {
  if (input?.where === undefined) {
    return {};
  }
  const { where } = input;

  return {
    search: where?.sequenceRead?.sample?.name,
  };
}
// TODO(bchu): This is pending the NextGen ORDER BY API.
export function getConsensusGenomesOrderByParams(
  input: InputMaybe<queryInput_consensusGenomes_input_Input> | undefined
): {
  [s: string]: unknown;
} {
  if (input?.orderBy === undefined) {
    return {};
  }
  const { orderBy } = input;

  return {
    orderBy: orderBy?.key,
    orderDir: orderBy?.dir, // ASC or DESC
  };
}

export function getConsensusGenomesNotNextGenParams(
  input: InputMaybe<queryInput_consensusGenomes_input_Input> | undefined
): {
  [s: string]: unknown;
} {
  if (input?.todoRemove === undefined) {
    return {};
  }
  const { todoRemove } = input;

  return {
    domain: todoRemove?.domain,
    visibility: todoRemove?.visibility,
    time: todoRemove?.time,
    taxaLevels: todoRemove?.taxaLevels,
    taxons: todoRemove?.taxons,
    offset: todoRemove.offset,
    limit: todoRemove.limit,
  };
}
