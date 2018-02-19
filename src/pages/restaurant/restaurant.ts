import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingrestaurantPage } from '../settingrestaurant/settingrestaurant';
import { Storage } from '@ionic/storage/dist/storage';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
import { DetailPage } from '../detail/detail';
import { RestaurantdetailPage } from '../restaurantdetail/restaurantdetail';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {
  status:any;
  errorMessage:any;
  sub:Subscription;
  getdata:any;
  user:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public getdataPvder:GetdataProvider, public auth:AuthServiceProvider) {

    this.user = this.auth.getUserInfo();
    if(this.user != null){
      this.status = this.user['status'];
    }
  }

  gotoSettingres(){ this.navCtrl.push(SettingrestaurantPage)}
  ionViewDidLoad() {
    this.getData();
    console.log('ionViewDidLoad RestaurantPage');
  }
  private getData() {
    this.sub = this.getdataPvder.getRestaurant().subscribe(
      (res) => this.getdata = res,
      (error) => {this.errorMessage = <any> error
    });
  }

  gotoNews(c){
    this.navCtrl.push(RestaurantdetailPage,{
      Data : c
    })

  }
}
