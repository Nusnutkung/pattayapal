import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-settingabout',
  templateUrl: 'settingabout.html',
})
export class SettingaboutPage {
  email:string;
  phone:number;
  sub: Subscription;
  errorMessage:string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public getdataPvder: GetdataProvider,
              public alertCtrl:AlertController
          
      ) { 

        this.sub = this.getdataPvder.getabout().subscribe(
          (res) => {
            if(res == null){
            }else{
              this.email = res['email'];
              this.phone = res['phone'];
            }
          },
          (error) => {this.errorMessage = <any> error
        });

      }


  save(){

    this.sub = this.getdataPvder.saveabout(this.email,this.phone).subscribe(
      (res) => {
        let alert = this.alertCtrl.create({
          message: 'บันทึกข้อมูลเรียบร้อย',
          buttons: ['OK']
        });
        alert.present();
      },
      (error) => {this.errorMessage = <any> error
    });

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingaboutPage');
  }




}
