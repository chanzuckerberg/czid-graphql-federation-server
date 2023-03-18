import { makeCZIDRestRequest, toCamelCase } from "../helpers";

export const fetchTaxonDist = async (parent, args, contextValue, info) => {
  const backgroundId = args.backgroundId;
  const taxonId = args.taxId;
  const requestHeaders = contextValue.headers;
  const res = await makeCZIDRestRequest(
    "backgrounds/" + backgroundId + "/show_taxon_dist?taxid=" + taxonId,
    requestHeaders
  );
  var output = await res.json();
  output = toCamelCase(output);
  return output;
};
