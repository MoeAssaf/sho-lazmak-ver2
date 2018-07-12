import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

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
  products: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afDB: AngularFireDatabase,
    private AFauth: AngularFireAuth) {
    this.directives = []
    this.directives.Title = this.navParams.get('title')
    this.directives.link = this.navParams.get('dblink')
    console.log(this.directives.link)
      this.grabProducts()
  }

 grabProducts(){
   this.afDB.list('store_product', ref=> ref.orderByChild('category').equalTo(`${this.directives.link}`)).valueChanges().subscribe(data=>{
     this.products = data
   })
 }

}
