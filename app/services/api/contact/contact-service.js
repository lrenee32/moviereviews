import { API } from "../api-service";

export const submitMessage = (body) => {
  return API({
    method: 'POST',
    path: `/message/create`,
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};