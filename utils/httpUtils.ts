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
  // const czidServicesToken = null;
  console.log('czidServicesToken', czidServicesToken)
  const query = context.params.query;
  console.log(query)
  const response = await fetch(`${process.env.NEXTGEN_ENTITIES_URL}/graphql`, {
    method: "POST",
    headers: {
      Cookie: context.request.headers.get("cookie"),
      "Content-Type": "application/json",
      "X-CSRF-Token": args?.input?.authenticityToken,
      Authorization: `Bearer ${czidServicesToken}`,
      // "Authorization": "Bearer eyJhbGciOiJFQ0RILUVTIiwiZW5jIjoiQTI1NkNCQy1IUzUxMiIsImVwayI6eyJjcnYiOiJQLTM4NCIsImt0eSI6IkVDIiwieCI6Ikh2V0ZuSVhiRDdta0l5M1Iwd0piNktwVkkxMko0aHVfcWM0djI2RHVrYnBSamZveDJJT3dxM3F6enBsa0hpTkYiLCJ5IjoiUDFtYkVtMlZFbFRVZkljZ3M0bTMzZXA2UGtpTEk4WllJeVRpUGJVZF9DLTdCQWdQYWJncmNWLURkdDN3bURGTCJ9LCJraWQiOiItQmx2bF9wVk5LU2JRQ2N5dGV4UzNfMk5MaHBia2J6LVk5VFFjbkY5S1drIiwidHlwIjoiSldFIn0..uDE913cc84Vs0sRpDtxCKg.g5MJCqvnMLDRvcVRSv1Um08UPdF5aIP6-BGpCUXd5cmQyBYRxu3XT97ZJ8x6rt9M_lmeaWnbJpvQv7YMhwjd4mto21TfFQEu4PMdtEH90ERK1IKJVSy4ZupE-xDapVUdCT0FuslF5KaCCHsEtq9jgDtRMSlEyIaLO2obfAyovi1aqOebksErFvPBRzToF-I0ZSo89fIwrAkIaOX2kiEOoya9_ShdNpaQoKI_DUNaG743RitFGFqkOX56r_FVW9k7jD5J9HdRy0JTx9oemz4ID-CvFqxAXI1dbCOIeCjr1XHSirUum9eHAeekwd_6PWLFydMuecYkSQXrsYaO8NlohRVBoh88Am1Q4XRt5uzKWqqwY3zp4zj_ZUMaKW_bhlrFk3Se3RZNPBe7CQ8LGISyFzVSil9mFQcE2QSKi3M-SPgaGC3fWBU6IwWy2dshZAFfO2nL0XBM1Qo79LBr95CBboebvctfmn7Ha2ZJ1cEdpUlz0ceeO-8zjfbjB8TTKT3weW5btYcC8wo6EZ6Bts6UB9WsoIsZTrmBcchclJla2vSxJelFzb4IgfZnpxv0PzT2.ubF0funRdCl-OsdG43VtyA7Bc1nDOHJNcrl3cTenqjA"
    },
    body: JSON.stringify(query),
  });
  if (fullResponse === "fullResponse"){
    console.log('full response', response)
    return response;
  } else {
    console.log("data response")
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

