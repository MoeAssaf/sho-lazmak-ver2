import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Store_details } from '../../models/store_details';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the StoreprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-storeprofile',
  templateUrl: 'storeprofile.html',
})
export class StoreprofilePage {
  store: any
  profile: any
  uid: string;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public AFauth: AngularFireAuth,
     public afDB: AngularFireDatabase,
     public alertCtrl: AlertController) {
    this.store = this.navParams.get('details') as Store_details
    this.grabProfile()
  }
  grabProfile(){
    this.uid = this.AFauth.auth.currentUser.uid
    this.afDB.object(`profile/${this.uid}`).valueChanges().subscribe(data =>{
      this.profile = data
      console.log('profile data', data)
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StoreprofilePage');
  }
  logForm(){
    if(this.store.name == "" || this.store.name == null || 
    this.store.info == ""|| this.store.info == null||
    this.store.email == ""|| this.store.email == null||
       this.store.telephone == "" || this.store.telephone == null || 
       this.store.telefax == ""|| this.store.telefax == null|| 
       this.store.address1 == "" || this.store.address1 == null ||
       this.store.address2 == "" || this.store.address2 == null || 
       this.store.address3 == "" || this.store.address3 == null ||
       this.store.category == "" ||this.store.category == null){
        this.alert('All fields are required, please check your form ')
    }else{
      this.pushData()

    }
  }
  pushData(){
    if(this.store.id == null){
    this.store.id = this.afDB.createPushId()
    }
    this.store.owner = this.uid
    this.afDB.object(`store/${this.store.id}`).set(this.store).then(result => {
      console.log(result)
      this.navCtrl.pop()
    })
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
