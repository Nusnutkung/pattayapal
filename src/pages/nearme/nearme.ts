import { Component, ElementRef, ViewChild , } from '@angular/core';
import { NavController  } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Data } from '../../models/data';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';
import { DetailPage } from '../detail/detail';
import { HomePage } from '../home/home';
declare var google:any;
@Component({
  selector: 'page-nearme',
  templateUrl: 'nearme.html',
})
export class NearmePage {
  @ViewChild('map') mapRef: ElementRef;
  lat:any = 12.916984;
  lng:any = 100.896238;
        constructor(public navCtrl: NavController,
          public getdataPvder: GetdataProvider,
          private googleMaps: GoogleMaps,
          private geolocation:Geolocation
      ) {
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NearmePage');
    this.getCurrentLocation();
    this.loadMap(this.lat, this.lng);
  }
  feature(){
      this.navCtrl.setRoot(HomePage);
  }

  getCurrentLocation(){
    console.log('getCurrentLocation');
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('resp.coords ' + JSON.stringify(resp.coords) );
 
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude
      this.loadMap(resp.coords.latitude ,resp.coords.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
       this.loadMap();
     });
     
  }



  loadMap(latitude = this.lat ,longitude = this.lng){
    console.log('latitude' + latitude);
    console.log('longitude' + longitude);
    let element = this.mapRef.nativeElement;
    var myLatlng = new google.maps.LatLng(latitude,longitude);
    var mapOptions = {
      zoom: 18,
      center: myLatlng
    }
    var map = new google.maps.Map(element, mapOptions);
    
    // Place a draggable marker on the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });

  }


}
