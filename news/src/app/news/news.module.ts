import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsRoutingModule } from './news-routing.module';
import { NewsPage } from './news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [NewsPage],
})
export class NewsPageModule {}
