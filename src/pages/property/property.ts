import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingrestaurantPage } from '../settingrestaurant/settingrestaurant';
import { Storage } from '@ionic/storage/dist/storage';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
import { SettingpropertyPage } from '../settingproperty/settingproperty';
import { PropertydetailPage } from '../propertydetail/propertydetail';


@Component({
  selector: 'page-property',
  templateUrl: 'property.html',
})
export class PropertyPage {


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
  gotoSettingproperty(){ this.navCtrl.push(SettingpropertyPage); }

  private getData() {
    this.sub = this.getdataPvder.getProperty().subscribe(
      (res) => this.getdata = res,
      (error) => {this.errorMessage = <any> error
    });
  }

  gotoPropertyDetail(c){ this.navCtrl.push(PropertydetailPage,{Data: c}) }
}
