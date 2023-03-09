import { request } from "graphql-request";
import fetch from "node-fetch";
import _ from 'lodash';

export const makeCZIDGraphQLRequest = async (query, variables, headers) => {
  const api_url = process.env.API_URL + "/graphql";
	console.log(headers["cookie"]);
  const res = await request(
    api_url,
    query,
    variables,
    // The czid-cookie is thus named because
    // the apollo server client strips out the "cookie" header
    { Cookie: headers["cookie"] }
  );
  return res;
};

export const makeCZIDRestRequest = async (path, headers) => {
  const api_url = process.env.API_URL;
  const res = await fetch(api_url + path, {
    headers: {
      Cookie: headers["cookie"],
    },
  });
  return res;
}


export const toCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(v => toCamelCase(v));
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [_.camelCase(key)]: toCamelCase(obj[key]),
      }),
      {},
    );
  }
  return obj;
};
