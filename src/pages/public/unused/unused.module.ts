import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnusedPage } from './unused';

@NgModule({
  declarations: [
    UnusedPage,
  ],
  imports: [
    IonicPageModule.forChild(UnusedPage),
  ],
})
export class UnusedPageModule {}
