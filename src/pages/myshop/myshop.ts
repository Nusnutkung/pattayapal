import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { RestaurantdetailPage } from '../restaurantdetail/restaurantdetail';

@Component({
  selector: 'page-myshop',
  templateUrl: 'myshop.html',
})
export class MyshopPage {
  user:any;
  datarestaurent:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth:AuthServiceProvider, public getdatapvd:GetdataProvider ){
    this.user  = this.auth.getUserInfo();
    this.getDatarestaurent();
  }
  getDatarestaurent(){
    this.getdatapvd.getListMyShop(this.user['email']).subscribe((res)=>{
      this.datarestaurent = res;
    })
  }
  gotoNews(c){
    this.navCtrl.push(RestaurantdetailPage,{
      Data : c
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyshopPage');
  }

}
