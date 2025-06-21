import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Subscription } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from '../abstractions/models';
import { SelectProps } from '../abstractions/types';
import { TOPIC_SELECT_PARAMS } from '../constants/common';
import { Page } from '../constants/enums';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit, OnDestroy {
  articles: Article[] | undefined;
  topicsParams: SelectProps[] = TOPIC_SELECT_PARAMS;
  subscription: Subscription = new Subscription();
  form: FormGroup | undefined;

  constructor(private readonly newsService: NewsService) {}

  get queryControl(): AbstractControl | null {
    return this.form?.get('query') || null;
  }

  get topicControl(): AbstractControl | null {
    return this.form?.get('topic') || null;
  }

  ngOnInit() {
    this.subscription = this.newsService
      .getArticles()
      .subscribe((newValue: Article[]) => {
        this.articles = newValue;
      });

    this.form = new FormGroup({
      query: new FormControl(null, [Validators.required, Validators.nullValidator]),
      topic: new FormControl('', []),
    });

    this.newsService.setCheckedTopic();
    this.newsService.getHeadlines();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getArticlePagePath(articleId: string): string {
    return `../${Page.NEWS}/${articleId}`;
  }

  getTopicName(topic?: string | null): string {
    const placeholder = 'Без темы';
    return topic
      ? TOPIC_SELECT_PARAMS.find(({ value }) => value === topic)?.title ||
          `${topic} (нет перевода)`
      : 'Без темы';
  }

  onSubmit() {
    if (!this.queryControl?.value || !this.topicControl) {
      return;
    }

    this.articles = undefined;
    this.newsService.setCheckedTopic(this.topicControl.value);
    this.newsService.setQuery(this.queryControl.value);
  }
}
