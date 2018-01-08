import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';
import { RegisterPage } from '../../pages/register/register';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
import { Login } from '../../models/login';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';


@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  Login:  Login[];
  sub: Subscription;
  errorMessage:string;
  email:string = '';
  pass:string= '';
  status:string= '';
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public getdataPvder: GetdataProvider,
              public alertCtrl: AlertController,
              public storage:Storage
              
      ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
    
  }

  gotoHomePage(){
    this.navCtrl.setRoot(ListPage);
  }
  register(){
    this.navCtrl.push(RegisterPage);
  }


  login(){
    if(this.email == '' || this.pass == ''){
      this.showAlert('กรุณาใส่ข้อมูล');
        return ; 
    }
    this.sub = this.getdataPvder.SelectUser(this.email,this.pass).subscribe(
      (res) => {
        if(res == null){
            this.showAlert('อีเมล์ หรือ รหัส ผิดพลาด')
        }else{
          this.Login = res
          this.status = res['status'];
          this.storage.set('Email', this.email);
          // this.storage.set('Password', this.pass);
          this.storage.set('status', res['status']);
          this.navCtrl.setRoot(MyApp);
        }
       
      },
      (error) => {this.errorMessage = <any> error
    });

  }

  showAlert(text) {
    let alert = this.alertCtrl.create({
      // title: 'Login!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
