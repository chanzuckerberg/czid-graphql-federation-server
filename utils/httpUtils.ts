import fetch from "node-fetch";
import { getEnrichedToken } from "./enrichToken";


export const get = async (url: string, args: any, context: any, fullResponse?: "fullResponse" ) => {
  try {
    let baseURL, urlPrefix;
    const nextGenEnabled = await shouldReadFromNextGen(context);
    if (nextGenEnabled) {
      return fetchFromNextGenServer(args, context, fullResponse)
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
      if (fullResponse === "fullResponse"){
        return response;
      } else {
        return await response.json();
      }
    }
  } catch (e) {
    return Promise.reject(e.response);
  }
};


const checkForLogin = (responseUrl: string | null) => {
  if (responseUrl?.includes("/auth0/refresh_token?mode=login")) {
    throw new Error("You must be logged in to perform this action.");
  }
};

export const postWithCSRF = async (
  url: string,
  body: any,
  args: any,
  context: any
) => {
  try {
    const nextGenEnabled = await shouldReadFromNextGen(context);
    if (nextGenEnabled) {
      return fetchFromNextGenServer(args, context)
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

const fetchFromNextGenServer = async (args, context, fullResponse?: "fullResponse") => {
  const czidServicesToken = await getEnrichedToken(context);
  console.log('czidServicesToken', czidServicesToken)
  const query = context.params.query;
  console.log(query)
  const response = await fetch(process.env.NEXTGEN_ENTITIES_URL, {
    method: "POST",
    headers: {
      Cookie: context.request.headers.get("cookie"),
      "Content-Type": "application/json",
      "X-CSRF-Token": args?.input?.authenticityToken,
      Authorization: `Bearer ${czidServicesToken}`,
    },
    body: JSON.stringify(query),
  });
  if (fullResponse === "fullResponse"){
    return response;
  } else {
    console.log(response)
    return await response.json();
  }
};


// export const getFeatureFlags = async (context: any) => {
//   try {
//     const response = await fetch(process.env.API_URL + "/users/feature_flags", {
//       method: "GET",
//       headers: {
//         Cookie: context.request.headers.get("cookie"),
//         "Content-Type": "application/json",
//       },
//     });
//     return await response.json();
//   } catch (e) {
//     return Promise.reject(e.response);
//   }
// };

//   try {
//     const featureFlags = await getFeatureFlags(context);
//     const combinedFeatureFlags = featureFlags["launched_feature_list"].concat(
//       featureFlags["allowed_feature_list"]
//     );
//     const nextGenEnabled = combinedFeatureFlags?.includes("next_gen");
//     return nextGenEnabled;
//   } catch (e) {
//     return Promise.reject(e.response);
//   }
// };

