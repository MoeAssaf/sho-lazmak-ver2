import { StoreproductsPage } from './../pages/storeproducts/storeproducts';
import { StorePage } from './../pages/store/store';
import { UsedPage, ReportPage } from './../pages/public/used/used';
import { AddPage } from './../pages/public/add/add';
import { MainPage } from './../pages/main/main';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';


import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera'
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductsPage } from "../pages/products/products";
import { NearbyPage } from "../pages/nearby/nearby";
import { StoresPage } from "../pages/stores/stores";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { SettingsPage } from '../pages/settings/settings'
import { ProfilePage } from '../pages/settings/profile/profile'

import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { OfferPage, Product } from '../pages/offer/offer';
import { MystorePage } from '../pages/mystore/mystore';
import { StoreprofilePage } from '../pages/storeprofile/storeprofile';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ProductsPage,
    StoresPage,
    LoginPage,
    RegisterPage,
    SettingsPage,
    ProfilePage,
    OfferPage,
    Product,
    MainPage,
    NearbyPage,
    AddPage,
    UsedPage,
    ReportPage,
    MystorePage,
    StorePage,
    StoreprofilePage
  
    
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
    TabsPage,
    ProductsPage,
    StoresPage,
    LoginPage,
    SettingsPage,
    RegisterPage,
    ProfilePage,
    OfferPage,
    Product,
    MainPage,
    NearbyPage,
    AddPage,
    UsedPage,
    ReportPage,
    MystorePage,
    StorePage,
    StoreprofilePage
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AngularFireAuth,
    AngularFireStorage,
    Camera,
    CallNumber,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
