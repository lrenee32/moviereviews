import { API } from "../api-service";

export const getReviews = (searchTerm: string) => {
  return API({
    method: 'GET',
    path: '/reviews',
    params: new URLSearchParams({
      searchTerm,
    }),
  });
};

export const getReview = (id: string | string[] | undefined) => {
  return API({
    method: 'GET',
    path: `/review/${id}`,
  });
}
