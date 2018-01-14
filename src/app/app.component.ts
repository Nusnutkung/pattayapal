import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,AlertController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SettingpromotionPage } from '../pages/settingpromotion/settingpromotion';
import { SettingadsPage } from '../pages/settingads/settingads';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { SettingPage } from '../pages/setting/setting';
import { FreegiftPage } from '../pages/freegift/freegift';
import { Storage } from '@ionic/storage';
import { SettingaboutPage } from '../pages/settingabout/settingabout';
import { YoutubePage } from '../pages/youtube/youtube';
import { ProfilePage } from '../pages/profile/profile';
import { Subscription } from 'rxjs/Subscription';
import { GetdataProvider } from '../providers/getdata/getdata';
import { GetpromotedPage } from '../pages/getpromoted/getpromoted';
import { CommingsoonPage } from '../pages/commingsoon/commingsoon';
import { RestaurantPage } from '../pages/restaurant/restaurant';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IntroPage;
  email:string;
  status:string;
  pages: Array<{title: string, component: any}>;
  sub: Subscription;
  errorMessage:string;
  user_id:any;
  image:any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public alertCtrl:AlertController,
              public storage:Storage,
              public getdataPvder:GetdataProvider
            ) {

              console.log('MYAPPPPPPPP     ')
    this.splashScreen.hide();
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Favorites', component: HomePage },
      // { title: 'News', component: ListPage },
      { title: 'Free Gifts', component: FreegiftPage },
      { title: 'ร้านอาหาร', component: RestaurantPage },
      { title: 'ที่พัก', component: CommingsoonPage },
      { title: 'Shopping', component: CommingsoonPage },
      { title: 'Playlists', component: YoutubePage },
      // { title: 'Youtube', component: YoutubePage },
      // { title: 'เกี่ยวกับ', component: AboutusPage },
      { title: 'การตั้งค่า', component: SettingPage }
      


    ];


      storage.get('Email').then((val) => {   
        if(val != null){
          this.email = val; 
          this.sub = this.getdataPvder.getUser(val).subscribe(
            (res) =>{
              this.user_id = res['user_id'];
              this.image = 'http://www.pattayapal.com/api/images/users/'+res["user_id"]+'.jpg';

            }
          )

          this.nav.setRoot(ListPage);

      storage.get('status').then((val)=>{
        if(val == 'admin'){
            this.status = val;
        }
      })
        }
      });
      storage.get('Firsttime').then((val) => {   
      if (val){
        this.nav.setRoot(ListPage);
      }
    });



  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

  openPage(page) { this.nav.setRoot(page.component); }
  gotoIntro(){ this.nav.setRoot(IntroPage); }
  gotoSettingpromotionPage(){ this.nav.push(SettingpromotionPage); }
  gotoSettingabout(){ this.nav.push(SettingaboutPage);  }
  gotoProfile(){ this.nav.push(ProfilePage);  }
  gotopromoted(){ this.nav.push(GetpromotedPage);  }
  gotoSettingAds(){ this.nav.push(SettingadsPage); }
  
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Exit?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.alertCtrl =null;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();

          }
        }
      ]
    });
    alert.present();
  }


}
