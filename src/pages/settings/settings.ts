import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, ActionSheetController, Events} from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Camera , CameraOptions} from "@ionic-native/camera";
import { storage  } from 'firebase';
import  { FirebaseApp } from 'angularfire2';

import { LoginPage } from '../login/login';

import { Storage } from '@ionic/storage';
import { ProfilePage } from './profile/profile'
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  // profile = {} as Profile
  //profile: AngularFireList<Profile[]>;
  profile: any
  uid: any
  email: any
  ready: boolean
  profile_picture: any
  constructor
  ( public navCtrl: NavController,
    public navParams: NavParams,
    private AFauth : AngularFireAuth,
    private afDB: AngularFireDatabase, 
    private alertCtrl : AlertController, 
    private store: Storage,
    private camera: Camera, 
    private firebaseApp : FirebaseApp,
    public actionSheetCtrl: ActionSheetController,
    public events: Events){
                //initializeApp(FIREBASE_CONFIG);
                this.store.get('state').then((val) => {
                  console.log(val);
                  if( val != 'logged'){
                    this.alert('Please login or register first!');
                    this.navCtrl.setRoot(LoginPage)
                    
                  }
                });
                this.grabProfile();
  
  }

  // ionViewCanEnter(): boolean {
  //   if (this.ready == false) {
  //    return false;
  //    }
  //    //etc...
  //   }
  async grabProfile(){
    try{
    const result = await this.AFauth.authState.subscribe(data => {
      if(data == null){
        this.logout()
      }
      this.uid = data.uid;
      this.email = data.email;
     
      console.log(data);
      console.log(this.email);
      console.log(this.uid);
       this.profile = this.afDB.object(`profile/${this.uid}`).valueChanges();
                 this.profile.subscribe(data => {console.log('Grabbed profile', data);
                                    this.profile = data;
                                    this.ready = true;
                                    if(data.level == 2){
                                      this.events.publish('userStore')
                                    }
                                    this.getProfileImageUrl();
                                    
                                                  });

   });
  
  }
   catch(e){
     console.log(e)
     this.logout()
   }
  }
  openForm(){
    this.navCtrl.push(ProfilePage, this.profile );

  }
  async takePhoto(sourceType:number){
    try {
    const options: CameraOptions = {
      quality: 120,
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

  const pictures = storage().ref(`${this.uid}/profile_picture/image`);
  pictures.putString(image, 'data_url');
  this.navCtrl.setRoot(SettingsPage)
  }

  catch(e){
    console.log(e)
  }
  }
  //`${this.uid}/profile_picture/image`
  getProfileImageUrl() {
    try {
    const storageRef = this.firebaseApp.storage().ref().child(`${this.uid}/profile_picture/image`);
    storageRef.getDownloadURL().then(url => {this.profile_picture = url;
      console.log('Picture link',this.profile_picture)
    });}
    catch(e){
      console.log(e)
    }
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
doRefresh(refresher) {
  console.log('Begin async operation', refresher);

  setTimeout(() => {
    console.log('Async operation has ended');
    this.navCtrl.setRoot(SettingsPage);
    refresher.complete();
  }, 2000);
}
// action sheet
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
logout(){
  this.navCtrl.setRoot(LoginPage)
  this.store.set('email',null);
  this.store.set('password',null);
  this.store.set('state','unlogged');
  this.events.publish('userloggedout');

  this.AFauth.auth.signOut().then(() => {
    //this.router.navigate(['']);
 })
}
}
