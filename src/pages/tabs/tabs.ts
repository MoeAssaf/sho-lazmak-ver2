import { MainPage } from './../main/main';
import { Component } from '@angular/core';

import { NearbyPage } from '../nearby/nearby';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MainPage;
  tab2Root = NearbyPage;


  constructor() {

  }
}
