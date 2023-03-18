import { fetchSample } from "./czid-graphql-queries/get_sample";
import { fetchProject } from "./czid-graphql-queries/get_project";
import { fetchTaxonDist } from "./czid-rest-requests/get_taxon_dist";
import { fetchTaxonDescription } from "./czid-rest-requests/get_taxon_descriptions";
import { fetchBulkDownload } from "./czid-rest-requests/get_bulk_downloads";
import { fetchBulkDownloadType } from "./czid-rest-requests/get_bulk_download_type";
import { updateSampleNotes } from "./czid-rest-requests/update_sample_notes";

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves projects from the "projects" array above.
export const resolvers = {
  Query: {
    project: async (parent, args, contextValue, info) =>
      await fetchProject(parent, args, contextValue, info),
    sample: async (parent, args, contextValue, info) =>
      await fetchSample(parent, args, contextValue, info),
    taxonDist: async (parent, args, contextValue, info) =>
      await fetchTaxonDist(parent, args, contextValue, info),
    taxonDescription: async (parent, args, contextValue, info) =>
      await fetchTaxonDescription(parent, args, contextValue, info),
    bulkDownload: async (parent, args, contextValue, info) =>
      await fetchBulkDownload(parent, args, contextValue, info),
    bulkDownloadType: async (parent, args, contextValue, info) =>
      await fetchBulkDownloadType(parent, args, contextValue, info),
  },
  Mutation: {
    updateSampleNotes: async (parent, args, contextValue, info) =>
      await updateSampleNotes(parent, args, contextValue, info),
  },
};
