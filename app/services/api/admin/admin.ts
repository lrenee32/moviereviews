import { API } from '../api-service';

const TMDB_URL = process.env.VUE_APP_TMDB_URL;
const TMBD_API_KEY = process.env.VUE_APP_TMDB_API_KEY;

export const getReviews = (userId: string | string[] | undefined, searchTerm: string) => {
  return API({
    method: 'GET',
    path: `/admin/${userId}/reviews`,
    params: new URLSearchParams({
      searchTerm,
    }),
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
