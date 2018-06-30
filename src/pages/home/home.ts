import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductsPage } from "../products/products"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  pictures: any;
  buttons: any;
  constructor(public navCtrl: NavController) {
    this.pictures = [
      {picture: 'https://i.imgur.com/H71X5Ip.jpg'},
      {picture: 'https://i.imgur.com/c9kwv7a.jpg'},
      {picture: 'https://i.imgur.com/Pm5MVMZ.jpg'},
    ];
    this.buttons = [
      {icon:'phone-portrait',content:'Smart Phones',category:'Smart Phones',link:'smartphones'},
      {icon:'football',content:'Sports',category:'Sports',link:'sports'},
      {icon:'shirt',content:'Fashion',category:'Fashion',link:'fashion'},
      {icon:'heart',content:'Body & health',category:'Body & health',link:'health'},
      {icon:'desktop',content:'Computers and Electronics',category:'Computers and Electronics',link:'electronics'},
      {icon:'ios-more',content:'Other',category:'Other',link:'other'},
    ]
  }



  ViewContents(category){
    console.log(category)
    let linkage = category.link
    let data ={
      title: category,
      dblink: linkage
    }
    console.log(linkage)
    this.navCtrl.push(ProductsPage,data)
  }
  ionViewWillEnter() {

  }
}
