import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController, ActionSheetController} from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';



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
