export type SelectProps = {
  title: string;
  value: string;
};

export type RequestParams = {
  lang: string;
  page_size?: number;
  sources?: string;
  topic?: string;
  q?: string;
};
