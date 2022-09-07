import { Descendant } from 'slate';

export type EntryTypes = 'review' | 'article';

export interface Entry<T> {
  PK: string,
  UserId: string | string[] | undefined,
  Title: string,
  Content: Descendant[],
  Details: T | null,
  Created: number,
  Tags: string[],
  Featured: number | '' | undefined,
  SitePick: number | '' | undefined,
  EntryType: EntryTypes,
  UserRating: number,
};

export interface Entries<T> {
  Featured: Entry<T>[],
  All: Entry<T>[],
  SitePicks: Entry<T>[],
  TopRated: Entry<T>[],
  LatestReviews: Entry<T>[],
};

export interface Review {
  TMDBId: number,
  TMDBRating: number,
  FilmTitle: string,
  FilmYear: string,
  FilmOverview: string,
  FilmPoster: string,
  FeaturedImage: {
    file: string,
  },
}
