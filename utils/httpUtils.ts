import fetch from "node-fetch";
import { getEnrichedToken } from "./enrichToken";

export const get = async ({url, args, context, serviceType, fullResponse}:{url?: string, args: any, context: any, serviceType?: "workflows" | "entities", fullResponse?: boolean} ) => {
  try {
    let baseURL, urlPrefix;
    const nextGenEnabled = await shouldReadFromNextGen(context);
    if (nextGenEnabled) {
      if (!serviceType) {
        console.error("You must pass a service type to call next gen") 
        return null;
      }
      return fetchFromNextGenServer(args, context, serviceType, fullResponse)
    } else {
      baseURL = process.env.API_URL;
      urlPrefix = args.snapshotLinkId ? `/pub/${args.snapshotLinkId}` : "";

      const response = await fetch(baseURL + urlPrefix + url, {
        method: "GET",
        headers: {
          Cookie: context.request.headers.get("cookie"),
          "Content-Type": "application/json",
        },
      });
      if (fullResponse === true){
        return response;
      } else {
        return await response.json();
      }
    }
  } catch (e) {
    return Promise.reject(e.response);
  }
};

export const postWithCSRF = async ({url, body, args, context, serviceType}:{
  url: string,
  body: any,
  args: any,
  context: any,
  serviceType?: "workflows" | "entities",
}) => {
  try {
    const nextGenEnabled = await shouldReadFromNextGen(context);
    if (nextGenEnabled) {
      if (!serviceType) {
        console.error("You must pass a service type to call next gen") 
        return null;
      }
      return fetchFromNextGenServer(args, context, serviceType)
    } else {
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
    }
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

export const getFeatureFlagsFromRequest = (context) => {
  return context.request.headers.get("x-should-read-from-nextgen");
};

export const shouldReadFromNextGen = async (context) => {
  let shouldReadFromNextGen = getFeatureFlagsFromRequest(context);
  if (shouldReadFromNextGen === true || shouldReadFromNextGen === "true" || shouldReadFromNextGen === "True") {
    // if the header is set, return the value
    return true;
  }
  return false;
}

export const formatFedQueryForNextGen = (query: string) => {
  let cleanQuery = query;

  // remove fed Prefix
  if(query.indexOf('fed')){
    const splitQueryOnFed = query.split("fed")
    const firstLetterLowerCase = splitQueryOnFed[1][0].toLowerCase();
      splitQueryOnFed[1] = splitQueryOnFed[1].slice(1)
      splitQueryOnFed.splice(1, 0, firstLetterLowerCase)
    cleanQuery = splitQueryOnFed.join('')
  }

  // remove input object from variables
    cleanQuery.replace("input: {", "")
    .replace("}}", "}")
    // TODO: (suzette 02/27/24) FIX THESE HACKS TO MAKE THIS FUNCTION MORE UNIVERSAL
    .replace("String", "UUID") // lets make an actual UUID
    // apply any specific type switches that need to be made - these can be passed in from the resolver
    .replace(/query_consensusGenomes_items/g, "ConsensusGenome")
  return cleanQuery;
}
const fetchFromNextGenServer = async (args, context, serviceType: "workflows"|"entities", fullResponse?: boolean) => {
  const czidServicesToken = await getEnrichedToken(context);
  console.log('czidServicesToken', czidServicesToken)
  const baseUrl = serviceType === "workflows" ? process.env.NEXTGEN_WORKFLOWS_URL : process.env.NEXTGEN_ENTITIES_URL;
  const cleanQuery = formatFedQueryForNextGen(context.params.query) 
  const response = await fetch(`${baseUrl}/graphql`, {
    method: "POST",
    headers: {
      Cookie: context.request.headers.get("cookie"),
      "Content-Type": "application/json",
      "X-CSRF-Token": args?.input?.authenticityToken,
      Authorization: `Bearer ${czidServicesToken}`,
    },
    body: JSON.stringify({
      "query": cleanQuery,
      "variables": context.params.variables
    }),
  });
  if (fullResponse === true){
    console.log('full response', response)
    return response;
  } else {
    console.log("data response")
    return await response.json();
  }
};

const checkForLogin = (responseUrl: string | null) => {
  if (responseUrl?.includes("/auth0/refresh_token?mode=login")) {
    throw new Error("You must be logged in to perform this action.");
  }
};