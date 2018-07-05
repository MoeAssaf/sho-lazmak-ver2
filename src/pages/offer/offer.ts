import { Product_details } from '../../models/product_details';
import { Component } from '@angular/core';
import {ViewController, IonicPage, NavController, NavParams , AlertController, ActionSheetController,ModalController} from 'ionic-angular';

import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import  { FirebaseApp, AngularFireModule } from 'angularfire2';


import { Camera , CameraOptions} from "@ionic-native/camera";
import { storage  } from 'firebase';
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
  products: any
  product: any
  other: any;
  electronics: any;
  smartphones: any;
  health: any;
  fashion: any;
  sports: any;
  ready: boolean;

    constructor
  ( public navCtrl: NavController,
    public navParams: NavParams,
    private AFauth : AngularFireAuth,
    private afDB: AngularFireDatabase, 
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public af: AngularFireModule
  ) {
      this.grabProfile()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
  }
  presentProfileModal() {
     this.navCtrl.push(Product);
  }
  async getOffers(){
      var path = ('public_product/');
      const query = this.afDB.list('/public_product', ref=> ref.orderByChild('owner').equalTo(this.uid)).valueChanges()
      query.subscribe(offers=> {
        this.products = offers;
        
      })
    //   this.product = this.afDB.object(path).valueChanges().subscribe(data=>
    //   {
    // var array = this.setValues(data);
    // this.products = array;
    // this.ready = true;
    // console.log('Final array',array);

    // })
  }
  setValues(data){
    const array = Object.keys(data).map(i => data[i]);
    let keys = Object.keys(data);
    var i;
    for (i = 0; i < keys.length; i++) { 
      array[i].id = `${keys[i]}`;
      return array
}
  }

  async grabProfile(){
   
     await this.AFauth.authState.subscribe(data => {
      this.uid = data.uid;
      this.email = data.email;
      console.log(data);
      console.log(this.email);
      console.log(this.uid);
       this.profile = this.afDB.object(`profile/${this.uid}`).valueChanges();
                 this.profile.subscribe(data => {console.log('Grabbed profile', data);
                                    this.profile = data;
                                    this.getOffers()

                                    //this.getProfileImageUrl();
                                                  });
  
   })
  }
  /// hold button stuff
  holdEvent(e, id){
    this.presentActionSheet(id)
  }
  deleteOffer(id){
    this.AFauth.authState.subscribe(auth=>{
      this.afDB.object(`public_product/${id}`).remove();
      storage().ref(`public_product/${id}/image`).delete()
    });
  }
  editOffer(id){

  }
  presentActionSheet(id) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What would you like to do?',
      buttons: [
        {
          text: 'Delete selected offer',
          role: 'destructive',
          handler: () => {
            this.deleteOffer(id)
          }
        },
        // {
        //   text: 'Edit selected offer',
        //   handler: () => {
        //     this.editOffer(id);
        //     console.log('Archive clicked');
        //   }
        // },
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
  products: any
  picture_key: string;
  constructor
  ( public navCtrl: NavController,
    public navParams: NavParams,
    private AFauth : AngularFireAuth,
    private afDB: AngularFireDatabase, 
    private alertCtrl : AlertController, 
    private camera: Camera, 
    public actionSheetCtrl: ActionSheetController,
    public viewCtrl: ViewController,
    private firebaseApp : FirebaseApp)
    {
    this.grabProfile()
  }
  //get profile data
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
// check form stuff
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
   this.picture_key = this.generateKey();
    this.uploadPhoto(`public_product/${this.picture_key}/image`)

  }
}
generateKey(){
  return '_' + Math.random().toString(36).substr(2, 9);
}
async getProfileImageUrl(path) {
  try {
  const storageRef = await this.firebaseApp.storage().ref().child(path);
  storageRef.getDownloadURL().then(url => {path = url;
    console.log('Picture link',path);
    this.addProduct(url)

    return path
  });}
  catch(e){
    console.log(e)
  }
}
//upload the product data
addProduct(path){
  this.product.owner = this.uid
  this.product.picture = path;
  this.product.id = this.picture_key
  this.AFauth.authState.subscribe(auth =>{
  this.afDB.object(`public_product/${this.picture_key}`).set(this.product).then((data) => {
    this.navCtrl.setRoot(OfferPage);

} )
  }
)
}
openForm(){
  this.navCtrl.push(ProfilePage, this.profile)
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
          this.addPhoto(1);
          console.log('Archive clicked');
        }
      },
      {
        text: 'Choose from library',
        handler: () => {
          this.addPhoto(0);
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
async addPhoto(sourceType:number){
  try {
  const options: CameraOptions = {
    quality: 100,
    targetHeight: 600,
    targetWidth: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType:sourceType,

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
pictures.putString(this.image, 'data_url').then(data=>this.getProfileImageUrl(path)
);
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

