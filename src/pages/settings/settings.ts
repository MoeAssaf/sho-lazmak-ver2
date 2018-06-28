import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {  FirebaseListObservable } from "angularfire2/database-deprecated";
import{ Profile } from '../../models/details'
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
  profile: FirebaseListObservable<Profile[]>;
  uid: any
  email: any
  ready: boolean
  constructor(public navCtrl: NavController, public navParams: NavParams,private AFauth : AngularFireAuth,
              private afDB: AngularFireDatabase, private alertCtrl : AlertController, private storage: Storage) {
                this.storage.get('state').then((val) => {
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
                                      console.log('Test',this.profile)
                                                  });
   })
  }
  openForm(){
    this.navCtrl.push(ProfilePage, this.profile );

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
