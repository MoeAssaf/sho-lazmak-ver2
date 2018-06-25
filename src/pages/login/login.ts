
import { Component } from '@angular/core';
import { NavController , AlertController , Platform} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Keyboard } from '@ionic-native/keyboard';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

// import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  todo = {email:"",password:""}

  constructor(private AFauth : AngularFireAuth,public navCtrl: NavController,  private alertCtrl: AlertController, private platform: Platform
              ,private keyboard : Keyboard, private stBar:StatusBar,private storage: Storage) {
    platform.ready().then(() => {
      // Here I'm using the keyboard class from ionic native.
      this.keyboard.disableScroll(true);
      this.stBar.styleDefault();
    });
    // this.storage.get('state').then((val) => {
    //   console.log(val);
    //   if( val == 'logged'){
    //     this.storage.get('email').then((email) => {
    //       this.storage.get('password').then((password) => {
    //        this.todo.email = email;
    //        this.todo.password = password;
    //        this.authenticate(this.todo)
    //       });
    //     });
    //   }
    // });
}

logForm(){
  console.log(this.todo);
  this.checkFields(this.todo)
}
register(){
  // this.navCtrl.push(RegisterPage)
}
checkFields(field){
  if( field.email == null || field.name == "" ||
      field.password == null || field.password == ""){
        console.log('check fields');
        this.alert("Both fields are required! If you do not have an account please register a new one.")
      }else{
        this.authenticate(this.todo);
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
async authenticate(field){
  field.email = field.email.replace(/\s/g,'');

  try{
    const result = await this.AFauth.auth.signInWithEmailAndPassword(field.email, field.password);
    if (result){
      this.setLoginData(field.email,field.password);
      this.navCtrl.setRoot(HomePage);}
  }
  catch(error){
    this.alert("Please check your email and password!")
    this.navCtrl.setRoot(HomePage)
    console.log(error);
  }
}
setLoginData(email,password){
    this.storage.set('email',email);
    this.storage.set('password',password);
    this.storage.set('state','logged');
    console.log('Storing details(SUCCESS)');
  }
}