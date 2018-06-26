import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the PublicPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-public',
  templateUrl: 'public.html'
})
export class PublicPage {

  usedRoot = 'UsedPage'
  unusedRoot = 'UnusedPage'


  constructor(public navCtrl: NavController) {}

}
