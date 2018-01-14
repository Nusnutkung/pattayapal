import { Component, transition } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
import { Storage } from '@ionic/storage';
import { SettingpromotionPage } from '../settingpromotion/settingpromotion';

@Component({
  selector: 'page-freegift',
  templateUrl: 'freegift.html',
})
export class FreegiftPage {
  yesterday : any;
  today : any = 'active';
  tomorrow : any;
  show : any = 'show' ;
  image : any;
  title : any;
  detail : any;
  condition : any;
  sub: Subscription;
  errorMessage:string;
  showImage = true;
  hideImage = false;
  login = false;
  email:any;
  pro_id:any;
  status:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public getdataPvder: GetdataProvider,
              public alertCtrl:AlertController,
              public storage:Storage
            ) {
    this.share('today');

    storage.get('Email').then((val)=>{
      if(val != null){
          this.login = true;
          this.email = val;
      }
    })
    storage.get('status').then((val)=>{
      console.log('status  ')
      if(val != null){
          this.login = true;
          this.status = val;
          console.log('val true  '+ val)
      }else{
        console.log('val false  '+ val)
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FreegiftPage');
  }

  share(date){

    if(date == 'yesterday'){
      this.yesterday = 'active';
      this.today = '';
      this.tomorrow = '';
      this.show = 'hidden'
      this.showImage = true;
      this.hideImage = false;
      this.sub = this.getdataPvder.getPromotion('Yesterday').subscribe(
        (res) => {
          if(res == null){
            this.resetValue();
          }else{
            this.title = res['title'];
            this.detail = res['detail'];
            this.condition = res['condition_pro']
            this.image = res['image']
            this.showImage = false;
            this.hideImage = true;
            this.pro_id = res['promotion_id'];
          }
        },
        (error) => {this.errorMessage = <any> error
      });


    }else if(date == 'today'){
      this.yesterday = '';
      this.today = 'active';
      this.tomorrow = '';
      this.show = 'show'     
      this.sub = this.getdataPvder.getPromotion('Today').subscribe(
        (res) => {
          if(res == null){
            this.resetValue();
          }else{         
            this.title = res['title'];
            this.detail = res['detail'];
            this.condition = res['condition_pro']
            this.image = res['image']
            this.showImage = false;
            this.hideImage = true;
            this.pro_id = res['promotion_id'];
          }
        },
        (error) => {this.errorMessage = <any> error
      });


      
    }else if(date == 'tomorrow'){
      this.yesterday = '';
      this.today = '';
      this.tomorrow = 'active';
      this.show = 'show'
      this.showImage = true;
      this.hideImage = false;
      this.sub = this.getdataPvder.getPromotion('Tomorrow').subscribe(
        (res) => {
          if(res == null){
            this.resetValue();
          }else{

            this.title = res['title'];
            this.detail = res['detail'];
            this.condition = res['condition_pro']
            this.image = res['image']
            this.showImage = false;
            this.hideImage = true;
            this.pro_id = res['promotion_id'];
          }
        },
        (error) => {this.errorMessage = <any> error
      });
    }
  }

  resetValue(){
    this.title = 'ยังไม่มีโปรโมชั่น';
    this.detail = 'ยังไม่มีโปรโมชั่น';
    this.condition = 'ยังไม่มีโปรโมชั่น';
    this.pro_id = '';
  }


  getLucky(){
    if(this.login == false){
    let alert = this.alertCtrl.create({
      message: 'กรุณา ล็อคอิน',
      buttons: ['OK']
    });
    alert.present();
  }else{
    this.getdataPvder.promote(this.email,this.pro_id).subscribe((res)=>{
      if(res['result'] == 'Error'){
        let alert = this.alertCtrl.create({
          message: 'คุณได้ลงทะเบียนแล้ว',
          buttons: ['OK']
        });
        alert.present();
      }

    });

  }


  }

  gotoSettingpromotionPage(){ this.navCtrl.push(SettingpromotionPage); }

}
