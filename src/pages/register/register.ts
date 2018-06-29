import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {  FirebaseListObservable } from "angularfire2/database-deprecated";
import { TabsPage } from '../tabs/tabs';
import{ Profile } from '../../models/details';import { LoginPage } from '../login/login';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  profile = {} as Profile;
  todo = {password1:"",password2:"",name:"",surname:"",email:""};
  constructor( private AFauth : AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private afDB: AngularFireDatabase,
    private store: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  logForm(){
    console.log(this.todo);
    const fields = this.todo;
    this.checkFields(fields);
  }
  checkFields(field){
    var string = this.todo.password1;

    if( this.profile.name == null || this.profile.name == "" ||
   this.profile.surname == null || this.profile.surname == "" ||
   field.email == null || field.email == "" ||
   field.password1 == null || field.password1 == "" ||
   field.password2 == null || field.password2 == ""){
      this.alert("All fields are required, please make sure that you have provided all fields")
    }
    else if( field.password1 != field.password2){
      this.alert("Passwords do not match, please make sure that both passwords are the same")
    }
    else if( string.length < 6){
      this.alert("The password has to be at least 6 charachters!")

    }
    else  {
      const fields = this.todo;

      this.register(fields)
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
  async register(field){
    try{
      const result = await this.AFauth.auth.createUserWithEmailAndPassword(field.email, field.password1);
      console.log(result);
      this.createProfile(field.email,field.password1);
     this.navCtrl.setRoot(TabsPage);
    }
    catch (error){

      this.alert("This email has already been registered!")
      console.error(error);
    }

  }
  createProfile(email, password){
    this.AFauth.authState.take(1).subscribe(auth =>{
      this.afDB.object(`profile/${auth.uid}`).set(this.profile).then(() => {
        this.store.set('email',email);
        this.store.set('password',password);
        this.store.set('state','logged');
        this.navCtrl.setRoot(LoginPage)} )
    }
  )
}

}
