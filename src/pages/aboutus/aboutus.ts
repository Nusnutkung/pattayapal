import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
import { SettingaboutPage } from '../settingabout/settingabout';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {
  email:string;
  phone:number;
  errorMessage:string;
  sub: Subscription;
  status:any;
  constructor(public navCtrl: NavController,public getdataPvder: GetdataProvider, public navParams: NavParams,public storage:Storage) {

    this.sub = this.getdataPvder.getabout().subscribe(
      (res) => {
          this.email = res['email'];
          this.phone = res['phone'];
      },
      (error) => {this.errorMessage = <any> error
    });

    storage.get('status').then((val)=>{
      if(val != null){
          this.status = val;
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
  }
  gotoSettingabout(){ this.navCtrl.push(SettingaboutPage);  }
}
