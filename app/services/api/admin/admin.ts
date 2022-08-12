import { Entry, Review } from 'utils/types';
import { API } from '../api-service';
import { v4 as uuidv4 } from 'uuid';
import isUrl from 'is-url';

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
  const entryId = uuidv4();
  let clone = JSON.parse(JSON.stringify(body));

  const promises = body.Content?.map(async (i, index) => {
    if (i.type === 'image') {
      const presignedURL = await API({
        method: 'POST',
        path: `/admin/${userId}/entry/presign/${entryId}`,
        params: new URLSearchParams({
          FileName: i.file.name,
        }),
      });

      await fetch(presignedURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: i.file,
      });

      const imageURL = presignedURL.split('?')[0];

      clone.Content[index].url = imageURL;
      delete clone.Content[index].file;
    }
    return i;
  });

  return Promise.all(promises)
    .then(() => {
      return API({
        method: 'POST',
        path: `/admin/${userId}/entry/create/${entryId}`,
        body: clone,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
};

export const editEntry = (
  userId: Entry<Review>["UserId"],
  entryId: Entry<Review>["EntryId"],
  body: Partial<Entry<Review>>,
) => {
  let clone = JSON.parse(JSON.stringify(body));

  const promises = body.Content?.map(async (i, index) => {
    if (i.type === 'image' && !isUrl(i.url)) {
      const presignedURL = await API({
        method: 'POST',
        path: `/admin/${userId}/entry/presign/${entryId}`,
        params: new URLSearchParams({
          FileName: i.file.name,
        }),
      });

      await fetch(presignedURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: i.file,
      });

      const imageURL = presignedURL.split('?')[0];

      clone.Content[index].url = imageURL;
      delete clone.Content[index].file;
    }
    return i;
  });

  return Promise.all(promises)
    .then(() => {
      return API({
        method: 'PUT',
        path: `/admin/${userId}/entry/edit/${entryId}`,
        body: clone,
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
