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
  run = false;
  count = 0;
  firsttime:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public getdataPvder: GetdataProvider,
              public alertCtrl: AlertController,
              public storage:Storage
              
      ) {
         storage.get('Firsttime').then( (val) =>{
          this.firsttime = val ;

        if(val === 1){
          this.run= true;
          return ;
        }
        
        let sett = setInterval((function () {
          this.count++;
           if(this.count == '18'){
             this.run= true;
             clearInterval(sett);
             return ;
           } 
        }).bind(this), 300);
      
    })

  }
  gotoHomePage(){
    this.navCtrl.setRoot(HomePage);
    this.storage.set('Firsttime',1);
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
