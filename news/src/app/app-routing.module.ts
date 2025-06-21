import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Page } from './constants/enums';

const routes: Routes = [
  {
    path: `${Page.NEWS}/:id`,
    loadChildren: () =>
      import('./article/article.module').then((m) => m.ArticlePageModule),
  },
  {
    path: Page.NEWS,
    loadChildren: () => import('./news/news.module').then((m) => m.NewsPageModule),
  },
  {
    path: Page.HOME,
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: Page.HOME,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
