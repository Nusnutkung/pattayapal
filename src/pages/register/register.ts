import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Login } from '../../models/login';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
import { ListPage } from '../../pages/list/list';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  email:string = '';
  phone:number;
  pass:string = '';
  confirmpass:string = '';
  sub: Subscription;
  errorMessage:string;
  Login:  Login[];
  sex: string ;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl:AlertController,
              public getdataPvder:GetdataProvider,
              public storage:Storage
            
            ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  gotoHomePage(){
    this.navCtrl.setRoot(ListPage);
  }
  register(){
if(this.email == '' || this.pass == '' || this.confirmpass == '' ){
  this.showAlert('กรุณาใส่ข้อมูลให้ครบ')
  return ;
}
    if(this.pass === this.confirmpass){
      this.sub = this.getdataPvder.InsertUser(this.email,this.pass,this.phone,this.sex).subscribe(
        (res) => {
          if(res['result'] == 'Aready'){
              this.showAlert('อีเมล์นี้มีผู้ใช้แล้ว')
              this.email = '';
              this.pass = '';
              this.confirmpass = '';
          }else if(res['result']== 'Done'){
            this.Login = res
            this.gotoHomePage();
          }
         
        },
        (error) => {this.errorMessage = <any> error
      });

    }else{
      this.showAlert('รหัสไม่ตรงกัน');
      this.pass = '';
      this.confirmpass = '';
    }





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
