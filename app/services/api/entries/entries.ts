import { API } from "../api-service";

export const getEntries = (SearchTerm: string) => {
  return API({
    method: 'GET',
    path: '/entries',
    params: new URLSearchParams({
      SearchTerm,
    }),
  });
};

export const getEntry = (EntryId: string | string[] | undefined) => {
  return API({
    method: 'GET',
    path: `/entry/${EntryId}`,
  });
};

export const getPosterImage = (posterPath: string) => {
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGES_URL}/w500/${posterPath}`;
};
