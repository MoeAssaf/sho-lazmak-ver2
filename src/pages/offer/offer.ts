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
import { ProfilePage } from '../settings/profile/profile';
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
  image: any
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
  if(this.product.name == null || this.product.name == ""||
  this.product.info == null || this.product.info == ""||
  this.product.price == null ||
  this.product.category == null || this.product.category == ""||
  this.product.state == null || this.product.state == ""){
    console.log(this.product)
    this.alert('Please provide all information, all fields are required!')
  }
  else if(this.image == null){
    this.alert('Please add a picture by tapping the grey space!')
  }
  else{
    this.addProduct()
  }
}
addProduct(){
  this.AFauth.authState.take(1).subscribe(auth =>{
  this.afDB.list(`public_product/${this.product.category}/${auth.uid}`).push(this.product).then((data) => {
    this.uploadPhoto(`public_product/${auth.uid}/${data.key}/image`)

} )
  }
)
}
openForm(){
  this.navCtrl.push(ProfilePage)
}
presentActionSheet() {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Set profile picture',
    buttons: [
      // {
      //   text: 'Destructive',
      //   role: 'destructive',
      //   handler: () => {
      //     console.log('Destructive clicked');
      //   }
      // },
      {
        text: 'Take photo',
        handler: () => {
          this.addPhoto();
          console.log('Archive clicked');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });

  actionSheet.present();
}
async addPhoto(){
  try {
  const options: CameraOptions = {
    quality: 50,
    targetHeight: 600,
    targetWidth: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  };
  const result = await this.camera.getPicture(options);

  this.image = `data:image/jpeg;base64,${result}`;

}
catch(e){
  console.log(e)
}
}
async uploadPhoto(path){
try{
const pictures = storage().ref(path);
pictures.putString(this.image, 'data_url');
this.navCtrl.setRoot(OfferPage)
}
catch(e){
this.alert('An error occured please try again!')}
}
alert(comment){
  console.log(comment);
  let ALERT = this.alertCtrl.create({
    title:"Alert",
    message: comment,
    buttons:[{text: " OK!"}]
  })
  ALERT.present()
}
}

