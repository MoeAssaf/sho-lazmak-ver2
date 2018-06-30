import { Product_details } from '../../models/product_details';
import { Component } from '@angular/core';
import {ViewController, IonicPage, NavController, NavParams , AlertController, ActionSheetController,ModalController} from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from "angularfire2/storage";
import {  FirebaseListObservable } from "angularfire2/database-deprecated";
import { Camera , CameraOptions} from "@ionic-native/camera";
import { storage , initializeApp } from 'firebase';
import  { FirebaseApp } from 'angularfire2';


import{ Profile } from '../../models/details'
import { Firebase } from '@ionic-native/firebase';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the OfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
})
export class OfferPage {
  uid: any
  email: any
  profile: any
    constructor
  ( public navCtrl: NavController,
    public navParams: NavParams,
    private AFauth : AngularFireAuth,
    private afDB: AngularFireDatabase, 
    private alertCtrl : AlertController, 
    private store: Storage,
    private camera: Camera, 
    private afStore: AngularFireStorage, 
    private firebase: Firebase, 
    private firebaseApp : FirebaseApp,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
  }
  presentProfileModal() {
    let profileModal = this.modalCtrl.create(Product);
    profileModal.present();
  }

}
@Component({
  templateUrl: 'product.html',
  selector: 'page-offer',

})
export class Product {
  uid: any
  email: any
  profile: any
  ready: boolean
  product= {} as Product_details
  constructor
  ( public navCtrl: NavController,
    public navParams: NavParams,
    private AFauth : AngularFireAuth,
    private afDB: AngularFireDatabase, 
    private alertCtrl : AlertController, 
    private store: Storage,
    private camera: Camera, 
    private afStore: AngularFireStorage, 
    private firebase: Firebase, 
    private firebaseApp : FirebaseApp,
    public actionSheetCtrl: ActionSheetController,
    public viewCtrl: ViewController) {
    this.grabProfile()
  }
 async grabProfile(){
   
  const result = await this.AFauth.authState.subscribe(data => {
    this.uid = data.uid;
    this.email = data.email;
    console.log(data);
    console.log(this.email);
    console.log(this.uid);
     this.profile = this.afDB.object(`profile/${this.uid}`).valueChanges();
               this.profile.subscribe(data => {console.log('Grabbed profile', data);
                                  this.profile = data;
                                  this.ready = true;
                                  //this.getProfileImageUrl();
                                                });

 })
}
dismiss() {
  this.viewCtrl.dismiss();
}
logForm(){

}
addProduct(){

}
openForm(){
  
}
}

