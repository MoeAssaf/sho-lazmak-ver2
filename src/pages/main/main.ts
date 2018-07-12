import { FirebaseApp } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductsPage } from "../products/products";
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  pictures: any;
  buttons: any;
  products: any;
  constructor(
    private afDB: AngularFireDatabase,
    public navCtrl: NavController,
  ) {
    this.pictures = []
    this.getProducts()
    this.buttons = [
      {icon:'phone-portrait',content:'Smart Phones',category:'Smart Phones',link:'smartphones'},
      {icon:'football',content:'Sports',category:'Sports',link:'sports'},
      {icon:'shirt',content:'Fashion',category:'Fashion',link:'fashion'},
      {icon:'heart',content:'Body & health',category:'Body & health',link:'health'},
      {icon:'desktop',content:'Computers and Electronics',category:'Computers and Electronics',link:'electronics'},
      {icon:'md-musical-notes',content:'Musical supplies ',category:'Musical supplies',link:'music'},
      {icon:'ios-restaurant',content:'Food / kitchen supplies ',category:'Food / kitchen supplies',link:'food'},
      {icon:'md-car',content:'Cars / Repairs',category:'Cars / Repairs',link:'cars'},
      {icon:'ios-baseball-outline',content:'Pets & Animals',category:'Pets & Animals',link:'animals'},
      {icon:'ios-more',content:'Other',category:'Other',link:'other'},
    ]
  }
  getProducts() {
     this.afDB.list('store_product', ref => 
    ref.limitToLast(6)
      ).valueChanges().subscribe(data=>{
        console.log(data);
        this.products = data
        this.getImages(data)
      })
  }

  getImages(data){
    var i
    for (i = 0; i < data.length; i++) { 
      this.pictures.push({picture:data[i].picture})
      console.log('ok')
}
console.log(this.pictures)
  }

  ViewContents(category, link){
    console.log(category)
    let data ={
      title: category,
      dblink: link
    }
    this.navCtrl.push(ProductsPage,data)
  }
  ionViewWillEnter() {

  }
}
