import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, ActionSheetController} from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from "angularfire2/storage";
import {  FirebaseListObservable } from "angularfire2/database-deprecated";
import { Camera , CameraOptions} from "@ionic-native/camera";
import { storage , initializeApp } from 'firebase';
import  { FirebaseApp } from 'angularfire2';


import{ Profile } from '../../../models/details'
import { Firebase } from '@ionic-native/firebase';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-used',
  templateUrl: 'used.html',
})
export class UsedPage {
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
    public actionSheetCtrl: ActionSheetController) {
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
                                    //this.ready = true;
                                    //this.getProfileImageUrl();
                                                  });

   })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UsedPage');
  }

}
