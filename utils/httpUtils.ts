import fetch from "node-fetch";

export const formatUrlParams = (params: any) => {
  const paramList = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`);
  if (paramList.length === 0) {
    return "";
  }
  return "?&" + paramList.join("&");
};

export const get = async (url: string, args: any, context: any) => {
  try {
    let baseURL, urlPrefix
    const nextGenEnabled = await isNextGenEnabled(context);
    if (!nextGenEnabled) {
        baseURL = process.env.API_URL;
        urlPrefix = args.snapshotLinkId ? `/pub/${args.snapshotLinkId}` : "";
        const response = await fetch(baseURL + urlPrefix + url, {
          method: "GET",
          headers: {
            Cookie: context.request.headers.get("cookie"),
            "Content-Type": "application/json",
          },
        });
        return await response.json();
    } else {
        // next gen details
    }
  } catch (e) {
    return Promise.reject(e.response);
  }
};

export const getFullResponse = async (url: string, args: any, context: any) => {
  try {
    const baseURL = process.env.API_URL;
    const urlPrefix = args.snapshotLinkId ? `/pub/${args.snapshotLinkId}` : "";
    const response = await fetch(baseURL + urlPrefix + url, {
      method: "GET",
      headers: {
        Cookie: context.request.headers.get("cookie"),
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    return Promise.reject(e.response);
  }
};

export const postWithCSRF = async (
  url: string,
  body: any,
  args: any,
  context: any
) => {
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
    return await response.json();
  } catch (e) {
    return Promise.reject(e.response);
  }
};

export const notFound = (message: string) => {
  return Promise.reject({
    status: 404,
    message: message,
  });
};

export const getFeatureFlags = async (context: any) => {
  try {
    const response = await fetch(process.env.API_URL + "/users/feature_flags", {
      method: "GET",
      headers: {
        Cookie: context.request.headers.get("cookie"),
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (e) {
    return Promise.reject(e.response);
  }
};

export const isNextGenEnabled = async (context) => {
  try {
    const featureFlags = await getFeatureFlags(context);
    const combinedFeatureFlags = featureFlags["launched_feature_list"].concat(
      featureFlags["allowed_feature_list"]
    );
    const nextGenEnabled = combinedFeatureFlags?.includes("next_gen");
    return nextGenEnabled
  } catch (e) {
    return Promise.reject(e.response);
  }
};
