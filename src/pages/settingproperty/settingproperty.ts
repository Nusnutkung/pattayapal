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
import { MyApp } from '../../app/app.component';
 declare var google:any;

@Component({
  selector: 'page-settingproperty',
  templateUrl: 'settingproperty.html',
})
export class SettingpropertyPage {
  @ViewChild('map') mapRef: ElementRef;
  title:string;
  detail:string;
  condition:string;
  sub: Subscription;
  map:any;
  errorMessage:string;
  showImage = true;
  ImageUrl: any;
  hideImage = false;
  ImageData:any;
  pro_id: any;
  price: any;
  lat:any;
  lng:any;
  defaultLat = 12.916984;
  defaultLng = 100.896238;
  data:any;
  phone:any;
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
    private loadingCtrl: LoadingController
  ) {
    if(this.navParams.get('Data')){
      this.data = this.navParams.get('Data');
      this.pro_id = this.data['id'];
      this.showImage = false;
      this.hideImage = true;
      this.ImageUrl = 'http://www.pattayapal.com/api/images/property/'+this.data['id']+'.jpg';
      this.price = this.data['price'];
      this.lat = this.data['lat'];
      this.lng = this.data['lng'];
      this.title = this.data['title'];
      this.detail = this.data['long_detail'];
      this.condition = this.data['short_detail'];
      this.phone = this.data['phone']
      console.log('log ' +JSON.stringify(this.data));

    }
  }

ionViewDidLoad() {
console.log('ionViewDidLoad SettingpromotionPage');
this.loadMap(this.lat , this.lng);
}

saveProperty() {

this.sub = this.getdataPvder.saveProperty(this.title,this.detail,this.condition,this.lat,this.lng,this.price,this.pro_id,this.phone).subscribe(
(res) => {
let alert = this.alertCtrl.create({
message: 'บันทึกข้อมูลเรียบร้อย',
buttons: ['OK']
});
alert.present();

// this.resetvalue();
this.navCtrl.setRoot(MyApp);
},
(error) => {this.errorMessage = <any> error
});
}

actionSheet(){
let actionSheet = this.actionSheetCtrl.create({
title: 'Select Image Source',
buttons: [
{
text: 'Load from Library',
handler: () => {

  let options: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    allowEdit: true,
    encodingType:this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    quality:100
  }
  this.camera.getPicture(options).then((imageData)=>{
    this.ImageData = imageData;
    this.ImageUrl = "data:image/jpeg;base64," + imageData 
    this.showImage = false;
    this.hideImage = true;
    this.uploadImage();
  }, (err) => {
    console.log('err');
   });

}
},
{
text: 'Use Camera',
handler: () => {
  let options: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.CAMERA,
    allowEdit: true,
    encodingType:this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    quality:100
  }
  this.camera.getPicture(options).then((imageData)=>{
    this.ImageData = imageData;
    this.ImageUrl = "data:image/jpeg;base64," + imageData 
    this.showImage = false;
    this.hideImage = true;
    this.uploadImage();
  }, (err) => {
    console.log('err');
    
   });

  
}
},
{
text: 'Cancel',
role: 'cancel'
}
]
});
actionSheet.present();
}

uploadImage(){
console.log('uploadImage')
let options = {
mimeType: "multipart/form-data",
params :{
data: this.ImageUrl,
id: this.pro_id,
Mode: 'UploadImageProperty'
}
}

let t = this.transfer.create();
t.upload(this.ImageUrl, "http://www.pattayapal.com/api/user.php?Mode=UploadImageProperty",options).then((res)=>{
let cutStr = res.response.split('["');
cutStr = cutStr[1].split('"]');
this.pro_id = cutStr[0];
}).catch((err)=>{
console.log('err' + err)
this.showImage = true;
this.hideImage = false;
})
}
resetvalue(){
this.title = '' ;
this.detail = '' ;
this.condition = '' ;

}


loadMap(latitude = this.defaultLat ,longitude = this.defaultLng){
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
map: map,
draggable:true,
});

google.maps.event.addListener(marker, 'dragend', ()=>{
this.lat = marker.getPosition().lat();
this.lng = marker.getPosition().lng();
});
}



}
