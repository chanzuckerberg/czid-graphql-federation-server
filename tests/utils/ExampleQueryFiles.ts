import { readFileSync } from 'fs';
import { join } from "path";

const exampleQueriesDir = "../../example-queries";

const getZipLinkExampleQueryPath = () : string => {
  return join(__dirname, `${exampleQueriesDir}/zip-link-query.graphql`);
};

export const getZipLinkExampleQuery = () : string => {
  return readFileSync(getZipLinkExampleQueryPath(), { encoding: "utf8" });
}


const getBulkDownloadCGOverviewExampleQueryPath = () : string => {
  return join(__dirname, `${exampleQueriesDir}/bulk-download-cg-overview-query.graphql`);
};

export const getBulkDownloadCGOverviewExampleQuery = () : string => {
  return readFileSync(getBulkDownloadCGOverviewExampleQueryPath(), { encoding: "utf8" });
}

const getBulkDownloadCGOverviewResponsePath = () : string => {
  return join(__dirname, "../../sample-responses/cgOverview.json");
}

export const getBulkDownloadCGOverviewResponse = () : string => {
  return readFileSync(getBulkDownloadCGOverviewResponsePath(), { encoding: "utf8" });
} 
