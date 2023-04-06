import { request } from "graphql-request";
import fetch from "node-fetch";
import _ from 'lodash';

export const makeCZIDGraphQLRequest = async (query, variables, headers) => {
  const api_url = process.env.API_URL + "/graphql";
  var req_headers = {}
  if (headers !== undefined ) {
     req_headers = {
        Cookie: ("cookie" in headers) ? headers["cookie"] : "",
        Host: ("host" in headers) ? headers["host"] : "",
     }
  }
  const res = await request(
    api_url,
    query,
    variables,
    req_headers,
  );
  return res;
};

export const makeCZIDRestRequest = async (path, headers, method='GET', body={}) => {
  const api_url = process.env.API_URL;
  var req_headers = {}
  if (headers !== undefined ) {
     req_headers = {
        Cookie: ("cookie" in headers) ? headers["cookie"] : "",
        Host: ("host" in headers) ? headers["host"] : "",
     }
  }
  const fetchParams = {
    method: method,
    headers: req_headers,
  }

  if (method === 'POST') {
    fetchParams['body'] = body;
  }
  console.log('api_url', api_url + path)

  const res = await fetch(api_url + path, fetchParams);
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
