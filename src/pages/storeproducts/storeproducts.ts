import { Store_details } from './../../models/store_details';
import { Product_details } from './../../models/product_details';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseApp } from 'angularfire2';
import { storage } from 'firebase';

/**
 * Generated class for the StoreproductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-storeproducts',
  templateUrl: 'storeproducts.html',
})
export class StoreproductsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  loadForm(){
    this.navCtrl.push(StoreProduct)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreproductsPage');
  }

}

///////////////////////////////////
@Component({
  selector: 'page-storeproducts',
  templateUrl: 'product.html',
})
export class StoreProduct {
  
uid: any
email: any
profile: any
ready: boolean
image: any
product= {} as Product_details
store_details: any
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
    this.product.state = 'official'
  this.grabProfile()
}
grabStore(){
  this.afDB.list('store', ref=> ref.orderByChild('owner').equalTo(`${this.uid}`)).valueChanges().subscribe(result=>{
    for(let object of result){
      this.store_details = object;
      console.log('My store:',object)


    }
  })
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
                                this.grabStore()
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
this.product.category == null || this.product.category == ""){
  console.log(this.product)
  this.alert('Please provide all information, all fields are required!')
}
else if(this.image == null){
  this.alert('Please add a picture by tapping the grey space!')
}
else{
 this.picture_key = this.generateKey();
  this.uploadPhoto(`store_product/${this.picture_key}/image`)

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
this.product.owner = this.store_details.id
this.product.picture = path;
this.product.id = this.picture_key
this.AFauth.authState.subscribe(auth =>{
this.afDB.object(`store_product/${this.picture_key}`).set(this.product).then((data) => {
  this.navCtrl.pop();

} )
}
)
}
openForm(){
this.navCtrl.pop()
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