import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';


import { Geolocation } from '@ionic-native/geolocation';
import { Keyboard } from '@ionic-native/keyboard'
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductsPage } from "../pages/products/products";
import { NearbyPage } from "../pages/nearby/nearby";
import { StoresPage } from "../pages/stores/stores";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { PublicPage } from '../pages/public/public';
import { SettingsPage } from '../pages/settings/settings'
import { ProfilePage } from '../pages/settings/profile/profile'

import { Firebase } from '@ionic-native/firebase';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { OfferPage, Product } from '../pages/offer/offer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ProductsPage,
    NearbyPage,
    StoresPage,
    LoginPage,
    RegisterPage,
    PublicPage,
    SettingsPage,
    ProfilePage,
    OfferPage,
    Product
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
       scrollAssist: false,
       autoFocusAssist: false
   }),
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ProductsPage,
    NearbyPage,
    StoresPage,
    LoginPage,
    PublicPage,
    SettingsPage,
    RegisterPage,
    ProfilePage,
    OfferPage,
    Product
    

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Keyboard,
    AngularFireAuth,
    AngularFireStorage,
    Camera,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
