export type DetailKV = { label: string; value: string };

export type ContentDetails = {
  poster?: string;
  title: string;
  subtitle: string;
  description: string;
  userRating?: number; 
  details: DetailKV[];
  actions: {
    isSaved?: boolean;
    isSubscribed?: boolean;
    isContinue?: boolean;
  };
  episodes: Episode[];
  related?: RelatedItem[];
  externalLinks?: ExternalLink[];
};

export type Episode = {
  id: string | number;
  season?: number;
  number: number;
  title: string;
  duration?: string; // e.g. "24m"
  progress?: number; // 0..1
  thumbnail?: string;
  description?: string;
};

export type RelatedItem = {
  id: string | number;
  title: string;
  subtitle?: string;
  poster?: string;
};

export type ExternalLink = { label: string; href: string };