import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreproductsPage } from './storeproducts';

@NgModule({
  declarations: [
    StoreproductsPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreproductsPage),
  ],
})
export class StoreproductsPageModule {}
