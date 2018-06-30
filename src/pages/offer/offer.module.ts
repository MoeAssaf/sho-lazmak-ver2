import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferPage } from './offer';
import { Product } from './offer';
@NgModule({
  declarations: [
    OfferPage,
    Product
  ],
  imports: [
    IonicPageModule.forChild(OfferPage),
    IonicPageModule.forChild(Product),

  ],
})
export class OfferPageModule {}
