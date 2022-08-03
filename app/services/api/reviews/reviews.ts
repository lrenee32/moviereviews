import { API } from "../api-service";

export const getReviews = (SearchTerm: string) => {
  return API({
    method: 'GET',
    path: '/reviews',
    params: new URLSearchParams({
      SearchTerm,
    }),
  });
};

export const getReview = (ReviewId: string | string[] | undefined) => {
  return API({
    method: 'GET',
    path: `/review/${ReviewId}`,
  });
}
