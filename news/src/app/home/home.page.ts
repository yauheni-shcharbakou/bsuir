import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Page } from '../constants/enums';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  sources: string[] = [];
  checkedSources: string[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private readonly newsService: NewsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.newsService.getSources().subscribe((sources: string[]) => {
      this.sources = sources;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isChecked(source: string): boolean {
    return this.checkedSources.includes(source);
  }

  toggleSource(source: string) {
    if (this.checkedSources.includes(source)) {
      this.checkedSources = this.checkedSources.filter(
        (cSource: string) => cSource !== source
      );
    } else {
      this.checkedSources.push(source);
    }
  }

  async onSubmit() {
    this.newsService.setCheckedSources(this.checkedSources);
    await this.router.navigate([Page.NEWS]);
  }
}
