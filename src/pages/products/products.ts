import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',

})
export class ProductsPage {
  public PageTitle
  public directives
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.directives = []

  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ProductsPage');
     let PageTitle = this.navParams.get('title')
     this.directives.Title = PageTitle
    console.log(PageTitle)
  }

}
