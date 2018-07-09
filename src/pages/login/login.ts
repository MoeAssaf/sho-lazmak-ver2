import { AngularFireDatabase } from 'angularfire2/database';

import { Component } from '@angular/core';
import { NavController , AlertController , Events, IonicPage} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  todo = {email:"",password:""}
  uid: string;

  constructor(
    private AFauth : AngularFireAuth,
    private afDB: AngularFireDatabase,
    public navCtrl: NavController,
      private alertCtrl: AlertController,
      private storage: Storage,
      public events: Events) {
 
    this.autoLogin()
  
}
autoLogin(){
  //check if user is logged in
  this.storage.get('state').then((val) => {
      console.log(val);
      if( val == 'logged'){
        this.storage.get('email').then((email) => {
          this.storage.get('password').then((password) => {
           this.todo.email = email;
           this.todo.password = password;
           this.authenticate(this.todo)
          });
        });
      }
    });
}
// called by submit button
logForm(){
  console.log(this.todo);
  this.checkFields(this.todo)
}
//called by create a new account button
register(){
  console.log('Opening form');
  this.navCtrl.push(RegisterPage)
}
// checks fields before authenticating 
checkFields(field){
  if( field.email == null || field.name == "" ||
      field.password == null || field.password == ""){
        console.log('check fields');
        this.alert("Both fields are required! If you do not have an account please register a new one.")
      }else{
        this.authenticate(this.todo);
      }
}
// sends an alert message with a provided comment
alert(comment){
    console.log(comment);
    let ALERT = this.alertCtrl.create({
      title:"Alert",
      message: comment,
      buttons:[{text: " OK!"}]
    })
    ALERT.present()
}
// checks fields with database
async authenticate(field){
  //removes spaces
  field.email = field.email.replace(/\s/g,'');

  try{
    const result = await this.AFauth.auth.signInWithEmailAndPassword(field.email, field.password);
    if (result){
      console.log(result.user.uid)
      this.uid = result.user.uid
      this.setLoginData(field.email,field.password);
      //successful
      this.navCtrl.setRoot(TabsPage);}
  }
  catch(error){
    this.storage.set('state','unlogged')
    // errors or invalid
    this.alert("Please check your email and password!")
    console.log(error);
  }
}
// save login details and tell the app if the account is logged
setLoginData(email,password){
    this.storage.set('email',email);
    this.storage.set('password',password);
    this.storage.set('state','logged');
    console.log('Storing details(SUCCESS)');
    this.afDB.object(`profile/${this.uid}`).valueChanges().subscribe(data=>{
      console.log(data)
      if(data['level'] == 1){
    this.events.publish('userloggedin');
  }else if (data['level'] == 2){
    console.log('is store')
    this.events.publish('userStore')
  }
  })
}
    
    
}