import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StoresPage');
    this.getRemoteData();
  };
  getRemoteData(){
    let path = 'https://sho-lazmak.000webhostapp.com/stores/';
    let encodedPath = encodeURI(path);
    let timeoutMS = 10000;
    this.http.get(encodedPath)
        .timeout(timeoutMS)
        .map(res => res.json()).subscribe(data => {
            let responseData = data;
            console.log(responseData);
          },
          err => {
            console.log('error in ETPhoneHome');
          });
        };
}
