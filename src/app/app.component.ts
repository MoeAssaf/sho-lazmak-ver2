import { Component , ViewChild } from '@angular/core';
import { Platform , Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { StoresPage } from "../pages/stores/stores";
import { LoginPage } from "../pages/login/login"
import { PublicPage } from '../pages/public/public';
import { SettingsPage } from '../pages/settings/settings'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  pages: Array<{ title: string, icon:string , component:any}>;
  rootPage:any = TabsPage;
  activePage:any

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,) {
    this.activePage = "TabsPage";
    this.pages = [
      { title: 'Home', icon:'ios-home-outline', component: TabsPage },
      { title: 'Other offers & deals', icon:'ios-basket-outline', component: PublicPage },
      { title: 'Stores', icon:'ios-navigate-outline', component: StoresPage},
      { title: 'Login/Register', icon:'ios-at-outline', component: LoginPage },
      { title: 'Settings', icon:'ios-construct-outline', component: SettingsPage },
    ];

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
