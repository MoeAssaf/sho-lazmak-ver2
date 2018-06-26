import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicPage } from './public';

@NgModule({
  declarations: [
    PublicPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicPage),
  ]
})
export class PublicPageModule {}
