import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ListPage } from '../list/list';
import { AboutusPage } from '../aboutus/aboutus';
import { MyApp } from '../../app/app.component';


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  email:string
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage:Storage,
              public alertCtrl:AlertController,

  ) {
    storage.get('Email').then((val) => {
      if(val != null){
        this.email = val;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  itemSelected(item: string) {
    console.log("Selected Item", item);
  }

  logout(){
    this.showAlert()

    // this.storage.get()
  }


  showAlert() {
    let alert = this.alertCtrl.create({
      // title: 'Exit?',
      message: 'ต้องการ ล็อคเอ้า',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alertCtrl =null;
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.clearData()


            this.navCtrl.setRoot(MyApp );




          }
        }
      ]
    });
    alert.present();
  }

  gotoAboutus(){ this.navCtrl.push(AboutusPage) }
  clearData(){
    this.storage.set('Email', null)
    this.storage.set('status', null)
    // this.storage.set('Email', null)
  }

}
