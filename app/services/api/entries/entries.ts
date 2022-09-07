import { API } from "../api-service";

export const getEntries = (SearchTerm?: string | null, EntryType?: string | null, Sort?: string | null, Query?: { key: string, value: string }[] | null, Limit?: number | null) => {
  let params = {
    SearchTerm: SearchTerm ?? '',
    EntryType: EntryType ?? '',
    Sort: Sort ?? '',
    Limit: Limit ? String(Limit) : '25',
  };
  if (Query) {
    Query.forEach(i => params = {...params, [i.key]: i.value });
  }
  return API({
    method: 'GET',
    path: '/entries',
    params: new URLSearchParams(params),
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
