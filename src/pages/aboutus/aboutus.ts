import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'page-aboutus',
  templateUrl: 'aboutus.html',
})
export class AboutusPage {
  email:string;
  phone:number;
  errorMessage:string;
  sub: Subscription;
  constructor(public navCtrl: NavController,public getdataPvder: GetdataProvider, public navParams: NavParams) {

    this.sub = this.getdataPvder.getabout().subscribe(
      (res) => {
          this.email = res['email'];
          this.phone = res['phone'];
      },
      (error) => {this.errorMessage = <any> error
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutusPage');
  }

}
