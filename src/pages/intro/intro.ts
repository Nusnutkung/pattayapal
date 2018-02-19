import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';
import { RegisterPage } from '../../pages/register/register';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
import { Login } from '../../models/login';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Events } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  Login:  Login[];
  sub: Subscription;
  errorMessage:string;
  status:string= '';
  run = false;
  count = 0;
  loading: Loading;
  firsttime:any;
  registerCredentials = { email: '', password: '' };
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public getdataPvder: GetdataProvider,
              public alertCtrl: AlertController,
              public storage:Storage,
              public auth:AuthServiceProvider,
              public loadingCtrl:LoadingController,
              public events: Events,
              public fb:Facebook
              
      ) {


        let info = this.auth.getUserInfo()
        console.log('intro ' + info );
    //      storage.get('Firsttime').then( (val) =>{
    //       this.firsttime = val ;

    //     if(val === 1){
    //       this.run= true;
    //       return ;
    //     }
        
    //     let sett = setInterval((function () {
    //       this.count++;
    //        if(this.count == '18'){
             this.run= true;
    //          clearInterval(sett);
    //          return ;
    //        } 
    //     }).bind(this), 300);
      
    // })

  }
  gotoHomePage(){
    this.navCtrl.setRoot(HomePage);
    this.storage.set('Firsttime',1);
  }
  register(){
    this.navCtrl.push(RegisterPage);
  }


  // login(){
  //   if(this.email == '' || this.pass == ''){
  //     this.showAlert('กรุณาใส่ข้อมูล');
  //       return ; 
  //   }
  //   this.sub = this.getdataPvder.SelectUser(this.email,this.pass).subscribe(
  //     (res) => {
  //       if(res == null){
  //           this.showAlert('อีเมล์ หรือ รหัส ผิดพลาด')
  //       }else{
  //         this.Login = res
  //         this.status = res['status'];
  //         this.storage.set('Email', this.email);
  //         // this.storage.set('Password', this.pass);
  //         this.storage.set('status', res['status']);
          
  //         this.navCtrl.setRoot(MyApp);
  //       }
       
  //     },
  //     (error) => {this.errorMessage = <any> error
  //   });

  // }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed.success) {        
        this.navCtrl.setRoot(HomePage);
        this.events.publish('user:login', allowed.user_id ,allowed.email, allowed.status,'',0 );
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }


  showAlert(text) {
    let alert = this.alertCtrl.create({
      // title: 'Login!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  loginfb(){
    this.fb.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) => {
      this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',[] ).then(profile => {
          this.auth.setUser('', profile['email'],'user','','',profile['picture_large']['data']['url']  )  
          this.events.publish('user:login', '' ,profile['email'], 'user' ,profile['picture_large']['data']['url'] ,1);
        this.navCtrl.setRoot(HomePage);
      })

  
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }



}
