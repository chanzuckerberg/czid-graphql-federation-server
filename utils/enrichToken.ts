const getCzidServicesTokenFromCookie = (cookieStr: string) => {
  const tokenKeyVal = cookieStr
    .split(';')
    .map((keyValStr: string) => keyValStr.split('='))
    .map((keyValArr: [string, string]) => ([
      decodeURIComponent(keyValArr[0].trim()),
      decodeURIComponent(keyValArr[1].trim()),
    ]))
    .find((keyValArr) => keyValArr[0] === "czid_services_token");

  return tokenKeyVal ? tokenKeyVal[1] : null;
}

export interface ResolverContext {
  request: {
    headers: Headers
  }
}

export const getEnrichedToken = async (context: ResolverContext) => {
  const headers = context.request.headers;
  const cookieStr = headers.get('cookie');

  const czidServicesToken = getCzidServicesTokenFromCookie(cookieStr);
  if (!czidServicesToken) {
    throw new Error('No czid_services_token found in cookie')
  }

  try {
    const enrichTokenURL = `${process.env.LEGACY_API_URL}/enrich_token`;
    const enrichedTokenResp = await fetch(enrichTokenURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${czidServicesToken}`,
      },
    });

    console.log("enrichedTokenResp", enrichedTokenResp);
    if (enrichedTokenResp.status !== 200) {
      return null;
    } else {
      return (await enrichedTokenResp.json()).token;
    }
  } catch (e) {
    throw new Error("Failed to validate token");
  }
}
