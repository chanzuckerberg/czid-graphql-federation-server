import { MockStore } from '@graphql-tools/mock';

export const zipLinkWorkflowRunId = "mockZipLinkId";
export const zipLinkUrl = "zip_link_url"

export const errorZipLinkWorkflowRunId = "mockErrorZipLinkId";
export const zipLinkError = "zip_link_error"

export const setZipLinksInStore = (store: MockStore) => {
  store.set("ZipLink", zipLinkWorkflowRunId, {
    url: zipLinkUrl,
  });

  store.set("ZipLink", errorZipLinkWorkflowRunId, {
    error: zipLinkError,
  });
};
