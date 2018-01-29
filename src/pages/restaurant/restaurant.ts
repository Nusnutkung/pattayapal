import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingrestaurantPage } from '../settingrestaurant/settingrestaurant';
import { Storage } from '@ionic/storage/dist/storage';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
import { DetailPage } from '../detail/detail';
import { RestaurantdetailPage } from '../restaurantdetail/restaurantdetail';


@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {
  status:any;
  errorMessage:any;
  sub:Subscription;
  getdata:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public getdataPvder:GetdataProvider) {
    storage.get('status').then( (res)=>{
      if(res != null){
        this.status = res;
      }
    })
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
