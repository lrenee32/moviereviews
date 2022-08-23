const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type APIMethod = "GET" | "POST" | "DELETE" | "PATCH" | "PUT" | "HEAD" | "OPTIONS" | "CONNECT";

interface FetchOptions {
  method: APIMethod,
  headers?: any | null,
  body?: any | null,
}

export interface APIRequest extends FetchOptions {
  path: string,
  params?: URLSearchParams,
};

const handleResponse = async (response: Response) => {
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json);
  }
  return json;
}

export const API = async (request: APIRequest) => {
  const url = new URL(baseUrl + request.path);
  if (request.params) {
    request.params.forEach((val, key) => url.searchParams.append(key, val));
  }
  return fetch(url, {
    method: request.method,
    headers: request.headers,
    body: JSON.stringify(request.body),
  })
    .then(res => handleResponse(res));
};