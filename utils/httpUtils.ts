import fetch from "node-fetch";
import { getEnrichedToken } from "./enrichToken";

export const get = async ({
  url,
  args,
  context,
  serviceType,
  fullResponse,
  customQuery,
}: {
  url?: string;
  args: any;
  context: any;
  serviceType?: "workflows" | "entities";
  fullResponse?: boolean;
  customQuery?: string;
}) => {
  try {
    const nextGenEnabled = await shouldReadFromNextGen(context);
    if (nextGenEnabled) {
      if (!serviceType) {
        console.error("You must pass a service type to call next gen");
        throw new Error("You must pass a service type to call next gen");
      } else {
        return fetchFromNextGen({ args, context, serviceType, fullResponse, customQuery });
      }
    } else {
      if (!url) {
        console.error("You must pass a url to call rails");
        throw new Error("You must pass a url to call rails");
      }
      return getFromRails({ url, args, context, fullResponse });
    }
  } catch (e) {
    return Promise.reject(e.response);
  }
};

export const postWithCSRF = async ({
  url,
  body,
  args,
  context,
}: {
  url: string;
  body: any;
  args: any;
  context: any;
}) => {
  try {
    const response = await fetch(process.env.API_URL + url, {
      method: "POST",
      headers: {
        Cookie: context.request.headers.get("cookie"),
        "Content-Type": "application/json",
        "X-CSRF-Token": args?.input?.authenticityToken,
      },
      body: JSON.stringify(body),
    });
    checkForLogin(response?.url);
    return await response.json();
  } catch (e) {
    return Promise.reject(e.response ? e.response : e);
  }
};

export const notFound = (message: string) => {
  return Promise.reject({
    status: 404,
    message: message,
  });
};

export const getFeatureFlagsFromRequest = context => {
  return context.request.headers.get("x-should-read-from-nextgen");
};

export const shouldReadFromNextGen = async context => {
  let shouldReadFromNextGen = getFeatureFlagsFromRequest(context);
  if (shouldReadFromNextGen === "true") {
    // if the header is set, return the value
    return true;
  }
  return false;
};

export const formatFedQueryForNextGen = (query: string) => {
  let cleanQuery = query;
  // remove fed Prefix
  const firstCurlyBracket = query.indexOf("{");
  const secondCurlyBracket = query.indexOf("{", firstCurlyBracket + 1);
  const fedIndex = query.indexOf("fed");
  if (fedIndex !== -1 && fedIndex < secondCurlyBracket && fedIndex > firstCurlyBracket) {
    const splitOnFirstFed = [query.substring(0, fedIndex + 4), query.substring(fedIndex + 4)];
    const splitQueryOnFed = splitOnFirstFed[0].split("fed");
    const firstLetterLowerCase = splitQueryOnFed[1][0].toLowerCase();
    splitQueryOnFed[1] = splitQueryOnFed[1].slice(1);
    splitQueryOnFed.splice(1, 0, firstLetterLowerCase);
    cleanQuery = splitQueryOnFed.join("").concat(splitOnFirstFed[1]);
  }

  // remove input object from variables
  const finishedQuery = cleanQuery
    .replace("input: {", "")
    .replace("}}", "}")
    // apply any specific type switches that need to be made
    .replace("$workflowRunId: String", "$workflowRunId: UUID")
    .replace(/query_fedConsensusGenomes_items/g, "ConsensusGenome");

  return finishedQuery;
};

export const fetchFromNextGen = async ({
  args,
  context,
  serviceType,
  fullResponse,
  customQuery,
}: {
  args;
  context;
  serviceType: "workflows" | "entities";
  fullResponse?: boolean;
  customQuery?: string;
}) => {
  const enrichedToken = await getEnrichedToken(context);
  const baseUrl = serviceType === "workflows" ? process.env.NEXTGEN_WORKFLOWS_URL : process.env.NEXTGEN_ENTITIES_URL;
  const formattedQuery = customQuery ? customQuery : formatFedQueryForNextGen(context.params.query);
  const response = await fetch(`${baseUrl}/graphql`, {
    method: "POST",
    headers: {
      Cookie: context.request.headers.get("cookie"),
      "Content-Type": "application/json",
      "X-CSRF-Token": args?.input?.authenticityToken,
      Authorization: `Bearer ${enrichedToken}`,
    },
    body: JSON.stringify({
      query: formattedQuery,
      variables: context.params.variables,
    }),
  });
  if (fullResponse === true) {
    return response;
  } else {
    return await response.json();
  }
};

export const getFromRails = async ({
  url,
  args,
  context,
  fullResponse,
}: {
  url: string;
  args: any;
  context: any;
  fullResponse?: boolean;
}) => {
  const baseURL = process.env.API_URL;
  const urlPrefix = args.snapshotLinkId ? `/pub/${args.snapshotLinkId}` : "";

  const response = await fetch(baseURL + urlPrefix + url, {
    method: "GET",
    headers: {
      Cookie: context.request.headers.get("cookie"),
      "Content-Type": "application/json",
    },
  });
  if (fullResponse === true) {
    return response;
  } else {
    return await response.json();
  }
};

const checkForLogin = (responseUrl: string | null) => {
  if (responseUrl?.includes("/auth0/refresh_token?mode=login")) {
    throw new Error("You must be logged in to perform this action.");
  }
};
