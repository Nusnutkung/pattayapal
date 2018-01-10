import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  Data : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.Data = navParams.get('Data');
    console.log(this.Data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
  dismiss() {
    // this.viewCtrl.dismiss();
  }
}
