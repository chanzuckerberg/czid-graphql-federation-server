import fetch from "node-fetch";

export const get = async (url: string, context: any) => {
    try {
        const response = await fetch(`http://web:3001${url}`, {
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
