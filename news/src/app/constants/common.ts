import { SelectProps } from '../abstractions/types';

export const NEWS_CATCHER_API_URL = 'https://api.newscatcherapi.com/v2';
export const NEWS_CATCHER_API_KEY = 'IeuZ44EbfG6rjmdDTMPEDsyO8iI9RgaUQKijJdFuInQ';

export const PAGE_LIMIT = 20;
export const TWO_SECONDS = 2000;

export const TOPIC_SELECT_PARAMS: SelectProps[] = [
  {
    title: 'Нет темы',
    value: '',
  },
  {
    title: 'Спорт',
    value: 'sport',
  },
  {
    title: 'Технологии',
    value: 'tech',
  },
  {
    title: 'Мир',
    value: 'world',
  },
  {
    title: 'Финансы',
    value: 'finance',
  },
  {
    title: 'Политика',
    value: 'politics',
  },
  {
    title: 'Бизнес',
    value: 'business',
  },
  {
    title: 'Экономика',
    value: 'economics',
  },
  {
    title: 'Красота',
    value: 'beauty',
  },
  {
    title: 'Путешествия',
    value: 'travel',
  },
  {
    title: 'Музыка',
    value: 'music',
  },
  {
    title: 'Еда',
    value: 'food',
  },
  {
    title: 'Наука',
    value: 'science',
  },
  {
    title: 'Игры',
    value: 'gaming',
  },
];
