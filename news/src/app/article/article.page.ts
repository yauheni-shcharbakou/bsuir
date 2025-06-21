import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../abstractions/models';
import { TWO_SECONDS } from '../constants/common';
import { Page } from '../constants/enums';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  article: Article | undefined;

  constructor(
    private readonly newsService: NewsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    const id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.article = this.newsService.getArticleById(id);

    setTimeout(() => {
      if (!this.article) {
        this.router.navigate([Page.NEWS]).then();
      }
    }, TWO_SECONDS);
  }
}
