import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { UploadModalPage } from '../../pages/upload-modal/upload-modal';  
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { Transfer , TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Platform } from 'ionic-angular/platform/platform';
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
import { Storage } from '@ionic/storage';
import { SettingrestPage } from '../settingrest/settingrest';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
 declare var google:any;

@Component({
  selector: 'page-restdetail',
  templateUrl: 'restdetail.html',
})
export class RestdetailPage {
  @ViewChild('map') mapRef: ElementRef;
  data:any;
  status:any;
  user:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private camera: Camera, 
              private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController,
              private getdataPvder: GetdataProvider,
              private alertCtrl: AlertController,
              private transfer: Transfer,
              private file: File,
              private filePath: FilePath,
              private platform: Platform,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private storage:Storage,
              private auth:AuthServiceProvider
            ){
        this.data = navParams.get('Data');
        this.user = this.auth.getUserInfo()

        if(this.data['owner'] == this.user['email'] ){
          this.status = true;
        }

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  gotoSettingres(){ 
    this.navCtrl.push(SettingrestPage, {
      Data : this.data
    })
  
  }

  loadMap(latitude = this.data['lat'] ,longitude = this.data['lng']){
    let element = this.mapRef.nativeElement;
    var myLatlng = new google.maps.LatLng(latitude,longitude);
    var mapOptions = {
      zoom: 10,
      center: myLatlng
    }
    var map = new google.maps.Map(element, mapOptions);
    
    // Place a draggable marker on the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map
    });

    google.maps.event.addListener(marker, 'click', ()=>{
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Open in...',
        buttons: [
          {
            text: 'Google Map',
            handler: () => {
              // infowindow.open(map,marker);
              window.open('http://maps.google.com/maps?q='+this.data['lat']+','+this.data['lng']);

            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {

            }
          }
        ]
      });
      actionSheet.present();
    });

  }


}
