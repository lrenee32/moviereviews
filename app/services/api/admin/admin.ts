import { Entry, Review } from 'utils/types';
import { API } from '../api-service';

export const getEntries = (userId: Entry<Review>["UserId"], SearchTerm: string) => {
  return API({
    method: 'GET',
    path: `/admin/${userId}/entries`,
    params: new URLSearchParams({
      SearchTerm,
    }),
  });
};

export const getEntry = (userId: Entry<Review>["UserId"], entryId: Entry<Review>["EntryId"]) => {
  return API({
    method: 'GET',
    path: `/admin/${userId}/entry/${entryId}`,
  });
};

export const createEntry = (
  userId: Entry<Review>["UserId"],
  body: Partial<Entry<Partial<Review>>>,
) => {
  return API({
    method: 'POST',
    path: `/admin/${userId}/entry/create`,
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const editEntry = (
  userId: Entry<Review>["UserId"],
  entryId: Entry<Review>["EntryId"],
  body: Partial<Entry<Review>>,
) => {
  return API({
    method: 'PUT',
    path: `/admin/${userId}/entry/edit/${entryId}`,
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteEntry = (
  userId: Entry<Review>["UserId"],
  entryId: Entry<Review>["EntryId"],
) => {
  return API({
    method: 'DELETE',
    path: `/admin/${userId}/entry/delete/${entryId}`,
  });
};

export const searchSuggestions = (searchTerm: string) => {
  return fetch('https://api.themoviedb.org/3/search/movie?api_key=51d3b35a03189901a4907665233f6831&query=' + searchTerm)
    .then(res => res.json())
    .then(json => json.results)
};
