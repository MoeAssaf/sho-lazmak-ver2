import { Camera, CameraOptions } from '@ionic-native/camera';
import { StoreprofilePage } from './../storeprofile/storeprofile';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Store_details } from '../../models/store_details';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { storage } from 'firebase';
import { FirebaseApp } from 'angularfire2';

/**
 * Generated class for the StorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {
  store_details: any
  uid: any;
  profile: any;
  store_picture: any;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public afDB: AngularFireDatabase,
     public AFauth: AngularFireAuth,
     private actionSheetCtrl: ActionSheetController,
     private camera: Camera,
     private firebaseApp : FirebaseApp
    ) {
    // this.store_details = {} as Store_details
    this.grabProfile()
    this.grabStore()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StorePage');
  }
  openForm(){
    const data = {
      details : this.store_details
    }
    this.navCtrl.push(StoreprofilePage,data)
  }
 

  grabProfile(){
    this.uid = this.AFauth.auth.currentUser.uid
    this.afDB.object(`profile/${this.uid}`).valueChanges().subscribe(data =>{
      this.profile = data
      console.log('profile data', data)
    })
  }
  grabStore(){
    this.afDB.list('store', ref=> ref.orderByChild('owner').equalTo(`${this.uid}`)).valueChanges().subscribe(result=>{
      for(let object of result){
        this.store_details = object;
        console.log('My store:',object)
        this.getProfileImageUrl()


      }
    })
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
  
    setTimeout(() => {
      console.log('Async operation has ended');
      this.navCtrl.setRoot(StorePage);
      refresher.complete();
    }, 2000);
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Set profile picture',
      buttons: [
        {
          text: 'Take photo',
          handler: () => {
            this.takePhoto(1);
            console.log('Archive clicked');
          }
        },
        {
          text: 'Choose from library',
          handler: () => {
            this.takePhoto(0);
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
  async takePhoto(sourceType:number){
    try {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    };
    const result = await this.camera.getPicture(options);

    const image = `data:image/jpeg;base64,${result}`;

  const pictures = storage().ref(`store/${this.store_details.id}/image`);
  pictures.putString(image, 'data_url');
  
}
catch(e){
  console.log(e)
}
  }
getProfileImageUrl() {
  try {
  const storageRef = this.firebaseApp.storage().ref().child(`store/${this.store_details.id}/image`);
  storageRef.getDownloadURL().then(url => {this.store_picture = url;
    console.log('Picture link',this.store_picture)
  });}
  catch(e){
    console.log('shit',e)
  }
}

}


