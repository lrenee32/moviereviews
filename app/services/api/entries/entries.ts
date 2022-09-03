import { API } from "../api-service";

export const getEntries = (SearchTerm: string, EntryType: string, Sort: string) => {
  return API({
    method: 'GET',
    path: '/entries',
    params: new URLSearchParams({
      SearchTerm,
      EntryType,
      Sort,
    }),
  });
};

export const getEntry = (PK: string | string[] | undefined) => {
  return API({
    method: 'GET',
    path: `/entry/${PK}`,
  });
};

export const getPosterImage = (posterPath: string) => {
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGES_URL}/w500/${posterPath}`;
};
