import { Descendant } from 'slate';

export type EntryTypes = 'review' | 'article';

export interface Entry<T> {
  EntryId: string,
  UserId: string | string[] | undefined,
  Title: string,
  Content: Descendant[],
  Details: T | null,
  Created: number,
  Tags: string[],
  Featured: boolean,
  SitePick: boolean,
  Type: EntryTypes,
};

export interface Entries<T> {
  Featured: Entry<T>[],
  All: Entry<T>[],
}

export interface Review {
  TMDBId: number,
  TMDBRating: number,
  FilmTitle: string,
  FilmYear: string,
  FilmOverview: string,
  FilmPoster: string,
  UserRating: number,
  FeaturedImage: {
    file: string,
  },
}
