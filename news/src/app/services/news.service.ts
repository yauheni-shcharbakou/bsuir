import { Injectable } from '@angular/core';
import { NewsRepository } from '../repositories/news.repository';
import { Observable, Subject } from 'rxjs';
import { Article } from '../abstractions/models';
import { switchMap } from 'rxjs/operators';
import { TWO_SECONDS } from '../constants/common';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private sources: Subject<string[]> = new Subject<string[]>();
  private articles: Subject<Article[]> = new Subject<Article[]>();

  private query: Subject<string> = new Subject<string>();

  private checkedTopic: string | undefined;
  private checkedSources: string[] = [];
  private articlesSync: Article[] = [];

  constructor(private readonly newsRepository: NewsRepository) {
    this.query
      .pipe(
        switchMap((query: string) =>
          this.newsRepository.getArticles(query, this.checkedSources, this.checkedTopic)
        )
      )
      .subscribe((articles: Article[]) => {
        this.articles.next(articles);
        this.articlesSync = articles;
      });

    this.articles.subscribe((articles: Article[]) => {
      this.articlesSync = articles;
    });

    this.newsRepository.getSources().subscribe((sources: string[]) => {
      this.sources.next(sources);
      setTimeout(() => this.getHeadlines(), TWO_SECONDS);
    });
  }

  getSources(): Observable<string[]> {
    return this.sources.asObservable();
  }

  getArticles(): Observable<Article[]> {
    return this.articles.asObservable();
  }

  getArticleById(id: string): Article | undefined {
    return this.articlesSync.find(({ _id }) => _id === id);
  }

  getHeadlines() {
    this.newsRepository
      .getLatestHeadlines(this.checkedSources, this.checkedTopic)
      .subscribe((articles: Article[]) => this.articles.next(articles));
  }

  setQuery(query: string) {
    this.query.next(query);
  }

  setCheckedSources(sources: string[]) {
    this.checkedSources = sources;
  }

  setCheckedTopic(topic?: string) {
    this.checkedTopic = topic;
  }
}
