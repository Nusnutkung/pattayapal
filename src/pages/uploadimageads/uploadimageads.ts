import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { Transfer , TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Platform } from 'ionic-angular/platform/platform';
import { GetdataProvider } from '../../providers/getdata/getdata';
@Component({
  selector: 'page-uploadimageads',
  templateUrl: 'uploadimageads.html',
})
export class UploadimageadsPage {
  page:any;
  image:any;
  ImageData:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public actionSheetCtrl:ActionSheetController,
              private camera: Camera, 
              private getdataPvder: GetdataProvider,
              private alertCtrl: AlertController,
              private transfer: Transfer,
              private file: File,
              private filePath: FilePath,
              private platform: Platform,
            ) {
    
    this.page = this.navParams.get('page');
    this.image = this.navParams.get('page');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadimageadsPage');
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
              encodingType:this.camera.EncodingType.PNG,
              mediaType: this.camera.MediaType.PICTURE,
              quality:100
            }
            this.camera.getPicture(options).then((imageData)=>{
              this.ImageData = imageData;
              this.image = "data:image/jpeg;base64," + imageData 

              this.uploadImage();
            }, (err) => {

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
              encodingType:this.camera.EncodingType.PNG,
              mediaType: this.camera.MediaType.PICTURE,
              quality:100
            }
            this.camera.getPicture(options).then((imageData)=>{
              this.ImageData = imageData;
              this.image = "data:image/jpeg;base64," + imageData 
              console.log('this.ImageData' + this.ImageData)
              console.log('this.ImageUrl' + this.image)

              this.uploadImage();
            }, (err) => {
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
    let options = {
      mimeType: "multipart/form-data",
      params :{
        data: this.image,
        name: this.page,
        Mode: 'UploadImageAds'
      }
    }
  
    let t = this.transfer.create();
    t.upload(this.image, "http://www.pattayapal.com/api/user.php?Mode=UploadImageAds&pages="+this.page ,options).then((res)=>{
  
    }).catch((err)=>{
      console.log('err' + err)
  
    })
  
  }





}
