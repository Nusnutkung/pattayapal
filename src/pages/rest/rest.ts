import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingrestaurantPage } from '../settingrestaurant/settingrestaurant';
import { Storage } from '@ionic/storage/dist/storage';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
import { SettingrestPage } from '../settingrest/settingrest';
import { RestdetailPage } from '../restdetail/restdetail';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-rest',
  templateUrl: 'rest.html',
})
export class RestPage {

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestPage');
    this.getData();
  }
  gotoSettingrest(){ this.navCtrl.push(SettingrestPage); }

  private getData() {
    this.sub = this.getdataPvder.getRest().subscribe(
      (res) => this.getdata = res,
      (error) => {this.errorMessage = <any> error
    });
  }

  gotoRestDetail(c){ this.navCtrl.push(RestdetailPage,{Data: c}) }
}
