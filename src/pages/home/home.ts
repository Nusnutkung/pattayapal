import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
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
declare var google:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapRef: ElementRef;
  featuredtab : any = 'active';
  nearmetab : any;
  featuredcontent:boolean = true;
  nearmecontent : boolean = false;
  hiddennearme: any = 'hidden';
  hiddencontent: any = 'show';
  map:any;
  Ads: any;
  News: any;
  AdsII: any;
  getdata: Data[];
  travelList:any;
  sub: Subscription;
  errorMessage:string;
  lat:any = '12.916984';
  lng:any = '100.896238';
  constructor(public navCtrl: NavController,
              public getdataPvder: GetdataProvider,
              private googleMaps: GoogleMaps
              // private geolocation:Geolocation
  ) {


    this.sub = this.getdataPvder.GetListNews('Ads',5).subscribe(
      (res) => this.Ads = res,
      (error) => {this.errorMessage = <any> error
    });

    this.GetListNews();
    // this.GetListTravel();


  }
  IonViewDidLoad(){
    
  }
  private GetListNews() {
    this.sub = this.getdataPvder.GetListNews('News',5).subscribe(
      (res) => this.getdata = res,
      (error) => {this.errorMessage = <any> error
    });
  }
  private GetListTravel() {
    this.sub = this.getdataPvder.GetListNews('Travel',5).subscribe(
      (res) => this.travelList = res,
      (error) => {this.errorMessage = <any> error
    });
  }
  // slideChanged() { this.slides.startAutoplay(); }

feature(){
  this.featuredtab = 'active' ;
  this.nearmetab = '';
  this.featuredcontent = true;
  this.nearmecontent = false;
  this.hiddennearme = 'hidden';
  this.hiddencontent = 'show' ;
}
nearme(){
  this.featuredtab = '';
  this.nearmetab = 'active' ;
  this.featuredcontent = false;
  this.nearmecontent = true;
  this.hiddennearme = 'show ';
  this.hiddencontent = 'hidden' ;
  
  // this.getCurrentLocation();
  this.loadMap(this.lat,this.lng);
}

  loadMap(latitude,longitude){
    
      let element = this.mapRef.nativeElement;
      console.log('loadMap ' + element);
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: 43.0741904,
            lng: -89.3809802
          },
          zoom: 18,
          tilt: 30
        }
      };
      // this.map = GoogleMaps.create(element,mapOptions);
      this.map = this.googleMaps.create(element, mapOptions);
   // Wait the MAP_READY before using any methods.
   this.map.one(GoogleMapsEvent.MAP_READY)
   .then(() => {
     console.log('Map is ready!');

     // Now you can use all methods safely.
     this.map.addMarker({
      title: 'Ionic',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    })
       .then(marker => {
         marker.on(GoogleMapsEvent.MARKER_CLICK)
           .subscribe(() => {
             alert('clicked');
           });
       });

   });
  }

  // getCurrentLocation(){
  //   console.log('getCurrentLocation ' );
  //   this.geolocation.getCurrentPosition().then((resp) => {
  //     // resp.coords.latitude
  //     // resp.coords.longitude
  //     this.loadMap(resp.coords.latitude , resp.coords.longitude );
  //     console.log('longitude ' + resp.coords.longitude);
  //     console.log('latitude ' + resp.coords.latitude);
  //     this.lat = resp.coords.latitude;
  //     this.lng = resp.coords.longitude
  //    }).catch((error) => {
  //      console.log('Error getting location', error);
  //    });
    
  // }

  gotoNews(c){
    this.navCtrl.push(DetailPage,{
      Data : c
    })
  }


}