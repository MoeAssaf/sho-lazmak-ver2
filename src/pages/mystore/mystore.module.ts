import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MystorePage } from './mystore';

@NgModule({
  declarations: [
    MystorePage,
  ],
  imports: [
    IonicPageModule.forChild(MystorePage),
  ]
})
export class MystorePageModule {}
