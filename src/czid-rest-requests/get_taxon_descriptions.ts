import { TaxonDescription } from "../generated/graphql.js";
import { makeCZIDRestRequest } from "../helpers.js";

export const fetchTaxonDescription = async (parent, args, contextValue, info) => {
  const taxonIdList = args.taxonIdList;
  const requestHeaders = contextValue.headers;
  const res = await makeCZIDRestRequest(
    "taxon_descriptions?taxon_list=" + taxonIdList,
    requestHeaders
  );
  const taxonDesc: TaxonDescriptionRestAPIResponse = await res.json() as TaxonDescriptionRestAPIResponse;
  const ret: TaxonDescription[] = transform(taxonDesc);
  return ret;
};

const transform = (data: TaxonDescriptionRestAPIResponse): TaxonDescription[] => {
  var ret = Object.values(data)
  const output: TaxonDescription[] = ret.map((x): TaxonDescription => {
    return {
      taxId: x.taxid,
      title: x.title,
      summary: x.summary,
      wikiUrl: x.wiki_url,
    }
  }, {})
  return output
}

interface TaxonDescriptionRestAPIResponse {
  string: {
    taxid: number;
    title: string;
    summary: string;
    wiki_url: string;
  }
};