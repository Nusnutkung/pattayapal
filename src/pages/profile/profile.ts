import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ModalController, AlertController, ToastController, LoadingController,Platform } from 'ionic-angular';
import { Login } from '../../models/login';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
import { Storage } from '@ionic/storage';
import { Camera,CameraOptions } from '@ionic-native/camera';
import { Transfer , TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email:any;
  phone:number;
  sub: Subscription;
  errorMessage:string;
  userId:number;
  image:any;
  sex:any;
  user_id:any;
  ImageData:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage:Storage,
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

              storage.get('Email').then((val) => {    
                this.email = val;
              this.sub = this.getdataPvder.getUser(val).subscribe(
                (res) =>{
                  this.email= res['email'];
                  this.phone = res['phone'];
                  this.sex = res['sex'];
                  this.user_id = res['user_id'];
                  this.image = 'http://www.pattayapal.com/api/images/users/'+res["user_id"]+'.jpg';



                }
              )
            })

            }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
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
              encodingType:this.camera.EncodingType.JPEG,
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
        name: 'test',
        Mode: 'UploadImageUser'
      }
    }
  
    let t = this.transfer.create();
    t.upload(this.image, "http://www.pattayapal.com/api/user.php?Mode=UploadImageUser?user_id="+this.user_id,options).then((res)=>{

    }).catch((err)=>{
      console.log('err' + err)
  
    })
  
  }

}
