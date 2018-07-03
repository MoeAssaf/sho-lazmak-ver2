import { Component , ViewChild , ElementRef } from '@angular/core';
import {  NavController, NavParams , Platform, AlertController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the NearbyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var google: any;
@Component({
  selector: 'page-nearby',
  templateUrl: 'nearby.html',
})
export class NearbyPage {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  lat: any;
  long: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private geo: Geolocation,private platform: Platform, alert : AlertController) {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // var options = {
      //   timeout: 10000
      // };
      this.geo.getCurrentPosition().then(resp => {
      console.log('map okay')
      console.log(resp.coords.longitude);
      this.long = resp.coords.longitude;
      this.lat = resp.coords.latitude;
      this.showMap();

    }).catch(() => {
      console.log("Unable to get location");
      this.showMap();

    });
  });
    console.log('ionViewDidLoad NearbyPage');
    console.log(this.mapRef);
  };
  showMap(){
    console.log('Function map called')
    const zoomLevel = 15;
    const location = new google.maps.LatLng(this.lat, this.long);
    const options = {
      center: location,
      zoom: zoomLevel,
      streetViewControl: false,
      mapTypeId: 'roadmap'};
    //========================STYLED====MAP===========================================================================
    var styledMapType = new google.maps.StyledMapType(
        [
          {elementType: 'geometry', stylers: [{color: '#ffffff'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#003d99'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: ''}]},
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{color: '#ffffff'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{color: '#fffff'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#fffff'}]
          },
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{color: '#ffffff'}]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#ffffff'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#66a3ff'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{color: '#ffffff'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#66a3ff'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#d4e3fc'}]
          },
          {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{color: '#b2d2ff'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#8ebdff'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#8ebdff'}]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry',
            stylers: [{color: '#3385ff'}]
          },
          {
            featureType: 'road.highway.controlled_access',
            elementType: 'geometry.stroke',
            stylers: [{color: '#db8555'}]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#db855'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#', visibility: "off" }]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.fill',
            stylers: [{color: '#', visibility: "off" }]
          },
          {
            featureType: 'transit.line',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#', visibility: "off" }]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#', visibility: "off" }]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{color: '#75fcff'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#003d99'}]
          }
        ],
        {name: 'Styled Map'});

    this.map = new google.maps.Map(this.mapRef.nativeElement,options);
    this.map.mapTypes.set('styled_map', styledMapType);
    this.map.setMapTypeId('styled_map')
  };
}
