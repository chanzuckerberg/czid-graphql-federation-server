import { GraphQLError } from "graphql";
import { Plugin, useMaskedErrors, MaskError } from "@envelop/core";
import { MeshPlugin } from "@graphql-mesh/types";

export const maskError: MaskError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }

  return new Error(String(error));
};

const plugins: MeshPlugin<any>[] = [
  useMaskedErrors({
    errorMessage: "Something went wrong.",
    maskError,
  }),
];

export default plugins;
