import { Component, transition } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public getdataPvder: GetdataProvider,
              public alertCtrl:AlertController
            
            ) {


    this.share('today');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FreegiftPage');
  }

  share(date){
    this.yesterday = 'active';
    this.today = '';
    this.tomorrow = '';
    this.show = 'hidden'
    this.showImage = true;
    this.hideImage = false;
    if(date == 'yesterday'){
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
          }
        },
        (error) => {this.errorMessage = <any> error
      });


      
    }else if(date == 'tomorrow'){
      this.yesterday = '';
      this.today = '';
      this.tomorrow = 'active';
      this.show = 'show'

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
  }


  getLucky(){
    let alert = this.alertCtrl.create({
      message: 'กรุณา ล็อคอิน',
      buttons: ['OK']
    });
    alert.present();
  }



}
