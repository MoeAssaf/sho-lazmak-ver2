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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductsPage } from "../pages/products/products";
import { NearbyPage } from "../pages/nearby/nearby";
import { StoresPage } from "../pages/stores/stores";
import { LoginPage } from "../pages/login/login";
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireAuth } from 'angularfire2/auth';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ProductsPage,
    NearbyPage,
    StoresPage,
    LoginPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
       scrollAssist: false,
       autoFocusAssist: false
   }),
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
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

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Keyboard,
    AngularFireAuth,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
