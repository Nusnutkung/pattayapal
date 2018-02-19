import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ListPage } from '../list/list';
import { AboutusPage } from '../aboutus/aboutus';
import { MyApp } from '../../app/app.component';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  email=false;
  user:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage:Storage,
              public alertCtrl:AlertController,
              public auth:AuthServiceProvider,
              public events:Events,
              public fb:Facebook

  ) {

    this.user = this.auth.getUserInfo();
    if(this.user['email']!= ''){
      this.email = true;
      console.log('email');
    }else{
      console.log('!email');
    }
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
            this.fb.logout().then(res=>{
              
            })
            this.auth.logout().subscribe(succ => {
              this.events.publish('user:logout', succ);
              this.navCtrl.setRoot(HomePage)
            });


          }
        }
      ]
    });
    alert.present();
  }

  gotoAboutus(){ this.navCtrl.push(AboutusPage) }
  clearData(){
    
  }

}
