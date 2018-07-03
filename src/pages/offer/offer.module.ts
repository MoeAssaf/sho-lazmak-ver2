import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferPage } from './offer';
import { Product } from './offer';
@NgModule({
  declarations: [
    OfferPage
    
  ],
  imports: [
    IonicPageModule.forChild(OfferPage),

  ],
})
export class OfferPageModule {}
