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
  constructor(
    public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public store: Storage , 
    public events: Events) {
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
      { title: 'My store', icon:'ios-pricetag-outline',component: StorePage},
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

  open(page){
    this.navCtrl.setRoot(page.component);
    this.activePage = page
  }
  pageStatus(element){
    return element == this.activePage;
  }
}
