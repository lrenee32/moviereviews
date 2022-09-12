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
  Featured: { data: Entry<T>[] },
  All: { data: Entry<T>[], next: { PK: string, Created: number } },
  SitePicks: { data: Entry<T>[] },
  TopRated: { data: Entry<T>[] },
  LatestReviews: { data: Entry<T>[] },
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
