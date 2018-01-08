import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Login } from '../../models/login' 
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-getpromoted',
  templateUrl: 'getpromoted.html',
})
export class GetpromotedPage {
  yesterday : any;
  today : any = 'active';
  tomorrow : any;
  sub: Subscription;
  data: any;
  hasPromotion = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public  getdataPvder:GetdataProvider
            ) {

              this.getdata('Today');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetpromotedPage');
  }


  getdata(date){
    this.hasPromotion = false;
    this.data = [];
    if(date == 'yesterday'){
      this.yesterday = 'active';
      this.today = '';
      this.tomorrow = '';

      this.getdataPvder.getListPromoted('Yesterday').subscribe(
        (res) => {
          if(res['result']== 'No Promotion'){
  
          }else{
            this.hasPromotion = true;
            this.data = res;
          } 
          
        });


    }else if(date == 'today'){
      this.yesterday = '';
      this.today = 'active';
      this.tomorrow = '';

      this.getdataPvder.getListPromoted('Today').subscribe(
        (res) => {
          if(res['result']== 'No Promotion'){
  
          }else{
            this.data = res;
            this.hasPromotion = true;
          }
          
        });



    }else if(date == 'tomorrow'){
      this.yesterday = '';
      this.today = '';
      this.tomorrow = 'active';

      this.sub = this.getdataPvder.getListPromoted('Tomorrow').subscribe(
        (res) => {
        if(res['result']== 'No Promotion'){

        }else{
          this.data = res;
          this.hasPromotion = true;
        }
        
      });

      }
    }
  

    chosePromo(user_id){
      console.log("user " + user_id)
    }

}
