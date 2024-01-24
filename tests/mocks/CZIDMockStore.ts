import { MockStore } from '@graphql-tools/mock';


import { setZipLinksInStore } from "./MockZipLink"


export default {
  initializeStore: (store: MockStore) => {
    setZipLinksInStore(store);
  }
}
