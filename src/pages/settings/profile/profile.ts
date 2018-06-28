import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {  FirebaseListObservable } from "angularfire2/database-deprecated";
import { Storage } from '@ionic/storage';
import{ Profile } from '../../../models/details'

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  name: string = this.navParams.get('name');
  surname: string = this.navParams.get('surname');
  address1: string = this.navParams.get('address1');
  address2: string = this.navParams.get('address2');
  address3: string = this.navParams.get('address3');

  
  // profile: FirebaseListObservable<Profile[]>;
  uid: any
  profile: Profile;
  constructor(public navCtrl: NavController, public navParams: NavParams,private AFauth : AngularFireAuth,
    private afDB: AngularFireDatabase, private alertCtrl : AlertController, private storage: Storage)  {
      this.profile = {} as Profile
      this.profile.name = this.name
      this.profile.surname = this.surname
      this.profile.address1 = this.address1
      this.profile.address2 = this.address2
      this.profile.address3 = this.address3

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  createProfile(){
    this.AFauth.authState.take(1).subscribe(auth =>{
      this.afDB.object(`profile/${auth.uid}`).set(this.profile).then(() => this.navCtrl.pop())
    }
  )
}
logForm(){
this.createProfile()
}
}
