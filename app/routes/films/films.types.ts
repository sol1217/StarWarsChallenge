export interface Film {
  title: string;
  director: string;
  producer: string;
  release_date: string;
  episode_id: number;
  opening_crawl: string;
  url: string;
}

export type FilmsImages = {
  [key: string]: string;
};

export interface Character {
  name: string;
}
