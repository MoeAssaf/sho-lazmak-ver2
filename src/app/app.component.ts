import { MystorePage } from './../pages/mystore/mystore';
import { StorePage } from './../pages/store/store';
import { Component , ViewChild } from '@angular/core';
import { Platform , Nav , Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { TabsPage } from '../pages/tabs/tabs';
import { StoresPage } from "../pages/stores/stores";
import { LoginPage } from "../pages/login/login"
import { SettingsPage } from '../pages/settings/settings';
import { Storage } from '@ionic/storage';
import { OfferPage } from '../pages/offer/offer';
import { UsedPage } from '../pages/public/used/used';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  pages: Array<{ title: string, icon:string , component:any}>;
  rootPage:any = TabsPage;
  activePage:any
loggedIn: any
loggedOut: any
userStore:any
  uid: string;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public store: Storage , 
    public events: Events,
    private AFauth : AngularFireAuth,
    private afDB: AngularFireDatabase,
    private storage: Storage) {
      this.autoLogin();

    this.loggedIn = [
        { title: 'Home', icon:'ios-home-outline', component: TabsPage },
        { title: 'Other offers & deals', icon:'ios-basket-outline', component: UsedPage },
        { title: 'Stores', icon:'ios-navigate-outline', component: StoresPage},
        { title: 'My offers & deals', icon: 'ios-add-outline', component: OfferPage},
        { title: 'Settings', icon:'ios-construct-outline', component: SettingsPage }
       
      ];
    this.loggedOut = [
        { title: 'Home', icon:'ios-home-outline', component: TabsPage },
        { title: 'Other offers & deals', icon:'ios-basket-outline', component: UsedPage },
        { title: 'Stores', icon:'ios-navigate-outline', component: StoresPage},
        { title: 'Login/Register', icon:'ios-at-outline', component: LoginPage },
      ];
    this.userStore = [ 
      { title: 'Home', icon:'ios-home-outline', component: TabsPage },
      { title: 'Other offers & deals', icon:'ios-basket-outline', component: UsedPage },
      { title: 'Stores', icon:'ios-navigate-outline', component: StoresPage},
      { title: 'My offers & deals', icon: 'ios-add-outline', component: OfferPage},
      { title: 'My store', icon:'ios-pricetag-outline',component: MystorePage},
      { title: 'Settings', icon:'ios-construct-outline', component: SettingsPage }
     
    ];
      this.activePage = "TabsPage";
      this.events.subscribe('userloggedin', (user, time) => {
        this.pages = this.loggedIn
        // user and time are the same arguments passed in `events.publish(user, time)`
        console.log('Welcome', user, 'at', time, this.loggedIn);
    });
    this.events.subscribe('userloggedout', (user, time) => {
      this.pages = this.loggedOut
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome', user, 'at', time, this.loggedIn);
  });
  this.events.subscribe('userStore', (user, time) => {
    this.pages = this.userStore
    // user and time are the same arguments passed in `events.publish(user, time)`
    console.log('Welcome', user, 'at', time, this.loggedIn);
})
    this.store.get('state').then((val) => {
      console.log(val);
      if( val != 'logged'){
        this.pages = this.loggedOut
      }else{
        this.pages = this.loggedIn
      }}
    );


// ===========================SPLASHSCREEN==================================
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
// =========================================================================
}

//+++++++++++++++++++++++++CONSTRUCTOR++END++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
autoLogin(){
  //check if user is logged in
  this.storage.get('state').then((val) => {
      console.log(val);
      if( val == 'logged'){
        this.storage.get('email').then((email) => {
          this.storage.get('password').then((password) => {
            
          //  this.todo.email = email;
          //  this.todo.password = password;
          const data = {
            email: email,
            password: password
          }
           this.authenticate(data)
          });
        });
      }
    });
}
  open(page){
    this.navCtrl.setRoot(page.component);
    this.activePage = page
  }
  pageStatus(element){
    return element == this.activePage;
  }
  async authenticate(field){
    //removes spaces
    field.email = field.email.replace(/\s/g,'');
  
    try{
      const result = await this.AFauth.auth.signInWithEmailAndPassword(field.email, field.password);
      if (result){
        console.log(result.user.uid)
        this.uid = result.user.uid
        //successful
        this.navCtrl.setRoot(TabsPage);
        this.afDB.object(`profile/${this.uid}`).valueChanges().subscribe(data=>{
          console.log(data)
          if(data['level'] == 1){
        this.events.publish('userloggedin');
      }else if (data['level'] == 2){
        console.log('is store')
        this.events.publish('userStore')
      }})}
    }
    catch(error){
      this.storage.set('state','unlogged')
      // errors or invalid
      // this.alert("Please check your email and password!")
      console.log(error);
    }
  }
  
}
