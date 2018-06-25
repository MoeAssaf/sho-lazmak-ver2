import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopstoresPage } from './topstores';

@NgModule({
  declarations: [
    TopstoresPage,
  ],
  imports: [
    IonicPageModule.forChild(TopstoresPage),
  ],
})
export class TopstoresPageModule {}
