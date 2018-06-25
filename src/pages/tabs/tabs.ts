import { Component } from '@angular/core';

import { NearbyPage } from '../nearby/nearby';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NearbyPage;


  constructor() {

  }
}
