import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
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
  number: string = this.navParams.get('number');
  level: number = this.navParams.get('level')
  
  // profile: FirebaseListObservable<Profile[]>;
  uid: any
  profile: Profile;
  constructor(public navCtrl: NavController, public navParams: NavParams,private AFauth : AngularFireAuth,
    private afDB: AngularFireDatabase)  {
      this.profile = {} as Profile
      this.profile.name = this.name
      this.profile.number = this.number
      this.profile.surname = this.surname
      this.profile.address1 = this.address1
      this.profile.address2 = this.address2
      this.profile.address3 = this.address3
      this.profile.level = this.level

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  createProfile(){
    this.AFauth.authState.subscribe(auth =>{
      this.afDB.object(`profile/${auth.uid}`).set(this.profile).then(() => this.navCtrl.pop())
    }
  )
}
logForm(){
this.createProfile()
}
}
