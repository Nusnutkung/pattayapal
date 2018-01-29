import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UploadimageadsPage } from '../uploadimageads/uploadimageads';


@Component({
  selector: 'page-settingads',
  templateUrl: 'settingads.html',
})
export class SettingadsPage {
  data= ['หน้าเมนู', 'หน้าข่าว','หน้าอาหาร','หน้าที่พัก' ];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingadsPage');
  }
  gotouploadimage(page){  this.navCtrl.push(UploadimageadsPage , {page: page} ); }
}
