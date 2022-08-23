import { API } from "../api-service";

export const submitMessage = (body: { name: string; email: string; message: string; }) => {
  return API({
    method: 'POST',
    path: `/message/create`,
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};