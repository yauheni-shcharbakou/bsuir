export type SourcesResponse = {
  sources: string[];
};

export type Article = {
  title: string;
  author: string;
  published_date: string;
  link: string;
  clean_url: string;
  excerpt: string;
  topic: string;
  authors: string[];
  media: string;
  _id: string;
};

export type NewsResponse = {
  articles: Article[];
};

// export type ImageParams = {
//   alt_description: string;
//   description: string;
//   urls: {
//     small: string;
//   };
// };
