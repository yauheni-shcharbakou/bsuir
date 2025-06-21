import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Article, NewsResponse, SourcesResponse } from '../abstractions/models';
import { Observable } from 'rxjs';
import {
  NEWS_CATCHER_API_URL,
  NEWS_CATCHER_API_KEY,
  PAGE_LIMIT,
} from '../constants/common';
import { map } from 'rxjs/operators';
import { RequestParams } from '../abstractions/types';

@Injectable({ providedIn: 'root' })
export class NewsRepository {
  private readonly headers: HttpHeaders = new HttpHeaders({
    'x-api-key': NEWS_CATCHER_API_KEY,
  });

  constructor(private readonly httpClient: HttpClient) {}

  getSources(): Observable<string[]> {
    return this.httpClient
      .get<SourcesResponse>(`${NEWS_CATCHER_API_URL}/sources`, {
        params: new HttpParams({ fromObject: { lang: 'ru' } }),
        headers: this.headers,
      })
      .pipe(map(({ sources }) => sources));
  }

  getLatestHeadlines(sources: string[] = [], topic?: string): Observable<Article[]> {
    const paramsObj: RequestParams = {
      lang: 'ru',
      page_size: PAGE_LIMIT,
    };

    if (topic) {
      paramsObj.topic = topic;
    }

    if (sources.length) {
      paramsObj.sources = sources.join(',');
    }

    return this.httpClient
      .get<NewsResponse>(`${NEWS_CATCHER_API_URL}/latest_headlines`, {
        params: new HttpParams({ fromObject: paramsObj }),
        headers: this.headers,
      })
      .pipe(map(({ articles }) => articles));
  }

  getArticles(
    query: string,
    sources: string[] = [],
    topic?: string
  ): Observable<Article[]> {
    const paramsObj: RequestParams = {
      q: query,
      lang: 'ru',
      page_size: PAGE_LIMIT,
    };

    if (topic) {
      paramsObj.topic = topic;
    }

    if (sources.length) {
      paramsObj.sources = sources.join(',');
    }

    return this.httpClient
      .get<NewsResponse>(`${NEWS_CATCHER_API_URL}/search`, {
        params: new HttpParams({ fromObject: paramsObj }),
        headers: this.headers,
      })
      .pipe(map(({ articles }) => articles));
  }
}
