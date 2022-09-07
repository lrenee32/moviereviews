import { API } from '../api-service';
import { v4 as uuidv4 } from 'uuid';
import isUrl from 'is-url';
import { getCookie } from 'cookies-next';

const presignAndPutObject = async (userId, entryId, file) => {
  const idToken = getCookie('CognitoIdentityServiceProvider.idToken');

  const presignedURL = await API({
    method: 'POST',
    path: `/admin/${userId}/entry/presign/${entryId}`,
    params: new URLSearchParams({
      FileName: file.name,
    }),
    headers: {
      'Authorization': `Bearer ${idToken}`,
    },
  });

  await fetch(presignedURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'binary/octet-stream',
    },
    body: file,
    redirect: 'follow',
  });

  const imageURL = presignedURL.split('?')[0];

  return imageURL;
};

export const getEntries = ({ req, res}, userId, SearchTerm) => {
  const idToken = getCookie('CognitoIdentityServiceProvider.idToken', { req, res });

  return API({
    method: 'GET',
    path: `/admin/${userId}/entries`,
    params: new URLSearchParams({
      SearchTerm,
    }),
    headers: {
      'Authorization': `Bearer ${idToken}`,
    },
  });
};

export const createEntry = async (
  userId,
  body,
) => {
  const idToken = getCookie('CognitoIdentityServiceProvider.idToken');

  const entryId = uuidv4();
  let clone = JSON.parse(JSON.stringify(body));

  const promises = body.Content?.map(async (i, index) => {
    if (i.type === 'image') {
      const imageURL = await presignAndPutObject(userId, entryId, i.file);

      clone.Content[index].url = imageURL;
      delete clone.Content[index].file;
    }
    return i;
  });

  clone.Details.FeaturedImage = await presignAndPutObject(userId, entryId, body.Details?.FeaturedImage.file);

  return Promise.all(promises)
    .then(() => {
      return API({
        method: 'POST',
        path: `/admin/${userId}/entry/create/${entryId}`,
        body: clone,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
      });
    });
};

export const editEntry = async (
  userId,
  entryId,
  body,
  previousImages,
) => {
  const idToken = getCookie('CognitoIdentityServiceProvider.idToken');

  let clone = JSON.parse(JSON.stringify(body));

  const promises = body.Content?.map(async (i, index) => {
    if (i.type === 'image' && !isUrl(i.url)) {
      const imageURL = await presignAndPutObject(userId, entryId, i.file);

      clone.Content[index].url = imageURL;
      delete clone.Content[index].file;
    }
    return i;
  });

  if (body.Details?.FeaturedImage.file && !isUrl(body.Details.FeaturedImage.url)) {
    clone.Details.FeaturedImage = await presignAndPutObject(userId, entryId, body.Details?.FeaturedImage.file);
  } else {
    clone.Details.FeaturedImage = body.Details?.FeaturedImage.url;
  }

  const images = clone.Content
    .filter(i => i.type === 'image')
    .map(i => i.url)
    .concat([clone.Details.FeaturedImage]);
  

  const imagesToDelete = previousImages && previousImages.length > 0 ? previousImages.filter(x => !images.includes(x)) : [];

  return Promise.all(promises)
    .then(() => {
      return API({
        method: 'PUT',
        path: `/admin/${userId}/entry/edit/${entryId}`,
        body: clone,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
      })
        .then(async res => {
          if (imagesToDelete && imagesToDelete.length > 0) {
            await API({
              method: 'DELETE',
              path: `/admin/${userId}/entry/delete/image/${entryId}`,
              body: imagesToDelete,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`,
              },
            });
          }
          return res;
        });
    });
};

export const deleteEntry = (
  userId,
  entryId,
  images,
) => {
  const idToken = getCookie('CognitoIdentityServiceProvider.idToken');
  
  return API({
    method: 'DELETE',
    path: `/admin/${userId}/entry/delete/${entryId}`,
    body: images,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`,
    },
  });
};

export const searchSuggestions = (searchTerm) => {
  return fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${searchTerm}`)
    .then(res => res.json())
    .then(json => json.results)
};
