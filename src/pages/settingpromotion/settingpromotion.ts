import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { UploadModalPage } from '../../pages/upload-modal/upload-modal';  
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { Transfer , TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Platform } from 'ionic-angular/platform/platform';

@Component({
  selector: 'page-settingpromotion',
  templateUrl: 'settingpromotion.html',
})
export class SettingpromotionPage {
  title:string;
  detail:string;
  condition:string;
  sub: Subscription;
  errorMessage:string;
  showImage = true;
  ImageUrl: any;
  hideImage = false;
  ImageData:any;
  pro_id: any;

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



              this.sub = this.getdataPvder.getPromotion('Tomorrow').subscribe(
                (res)=>{
                  if(res != null){
                    this.hideImage = true;
                    this.showImage = false;
                    this.pro_id = res['promotion_id'];
                    this.title = res['title'];
                    this.detail = res['detail'];
                    this.condition = res['condition_pro'];
                    this.ImageUrl = res['image'];
                  }
                })



            }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingpromotionPage');
  }

  savePromotion() {
    // console.log('condition ' + this.condition)
    this.sub = this.getdataPvder.savePromotion(this.title,this.detail,this.condition,this.pro_id).subscribe(
      (res) => {
        let alert = this.alertCtrl.create({
          message: 'บันทึกข้อมูลเรียบร้อย',
          buttons: ['OK']
        });
        alert.present();
        this.resetvalue();
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
              console.log('this.ImageData' + this.ImageData)
              console.log('this.ImageUrl' + this.ImageUrl)
              this.showImage = false;
              this.hideImage = true;
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
      data: this.ImageUrl,
      name: 'test',
      Mode: 'UploadImage'
    }
  }

  let t = this.transfer.create();
  t.upload(this.ImageUrl, "http://www.pattayapal.com/api/user.php?Mode=UploadImage",options).then((res)=>{
  this.pro_id = res['id'];
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
  

}
