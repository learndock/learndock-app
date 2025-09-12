export interface Thema {
  name: string;
  themenkreise: string[];
}

export interface ThemaNummer {
  [key: string]: Thema;
}

export interface Fragenkomplex {
  name: string;
  themen: ThemaNummer;
}

export interface Katalog {
  [key: string]: Fragenkomplex;
}