import fetch from "node-fetch";

export const formatUrlParams = (params: any) => {
    const paramList = Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`);
    if (paramList.length === 0) {
        return "";
    }
    return "?&" + paramList.join("&");
}

export const get = async (url: string, context: any) => {
    try {
        const response = await fetch(process.env.API_URL + url, {
            method: 'GET',
            headers: {
              'Cookie': context.request.headers.get("cookie"),
              'Content-Type': 'application/json',
            },
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
}
