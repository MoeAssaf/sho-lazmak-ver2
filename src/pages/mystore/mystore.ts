
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { StorePage } from '../store/store';

/**
 * Generated class for the MystorePage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mystore',
  templateUrl: 'mystore.html'
})
export class MystorePage {

  storeRoot = StorePage
  storeproductsRoot = 'StoreproductsPage'


  constructor(
    public navCtrl: NavController
    ) {
  
  }

}
