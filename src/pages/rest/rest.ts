import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingrestaurantPage } from '../settingrestaurant/settingrestaurant';
import { Storage } from '@ionic/storage/dist/storage';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
import { SettingrestPage } from '../settingrest/settingrest';
import { RestdetailPage } from '../restdetail/restdetail';

@Component({
  selector: 'page-rest',
  templateUrl: 'rest.html',
})
export class RestPage {

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
