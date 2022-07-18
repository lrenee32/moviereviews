import { Review } from 'utils/types';
import { API } from '../api-service';

export const getReviews = (userId: string | string[] | undefined, searchTerm: string) => {
  return API({
    method: 'GET',
    path: `/admin/${userId}/reviews`,
    params: new URLSearchParams({
      searchTerm,
    }),
  });
};

export const getReview = (userId: string | string[] | undefined, reviewId: string | string[] | undefined) => {
  return API({
    method: 'GET',
    path: `/admin/${userId}/review/${reviewId}`,
  });
};

export const updateReview = (
  userId: string | string[] | undefined,
  reviewId: string | string[] | undefined,
  body: Review,
) => {
  return API({
    method: 'PUT',
    path: `/admin/${userId}/review/edit/${reviewId}`,
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// export default {
//   getReviews(searchTerm) {
//     return API.get(baseUri, { searchTerm })
//       .then(res => res.map(i => format(i)));
//   },
//   createReview(params) {
//     return API.post(baseUri, params)
//       .then(res => format(res));
//   },
//   editReview(id, params) {
//     return API.put(`${baseUri}/${id}`, params)
//       .then(res => format(res));
//   },
//   deleteReview(id) {
//     return API.delete(`${baseUri}/${id}`);
//   },
//   searchSuggestions(params) {
//     params.api_key = TMBD_API_KEY;
//     return axios.get(`${TMDB_URL}/search/movie`, { params })
//       .then(res => res.data);
//   },
// };
