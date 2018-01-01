import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,AlertController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroPage } from '../pages/intro/intro';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SettingpromotionPage } from '../pages/settingpromotion/settingpromotion';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { SettingPage } from '../pages/setting/setting';
import { FreegiftPage } from '../pages/freegift/freegift';
import { Storage } from '@ionic/storage';
import { SettingaboutPage } from '../pages/settingabout/settingabout';
import { YoutubePage } from '../pages/youtube/youtube';
import { ProfilePage } from '../pages/profile/profile';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IntroPage;
  email:string;
  status:string;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public alertCtrl:AlertController,
              public storage:Storage
            ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Favorites', component: HomePage },
      { title: 'News', component: ListPage },
      { title: 'Youtube', component: YoutubePage },
      { title: 'Promotion', component: FreegiftPage },
      { title: 'เกี่ยวกับ', component: AboutusPage },
      { title: 'การตั้งค่า', component: SettingPage }


    ];


      storage.get('Email').then((val) => {      
        if(val != null){
          this.email = val ;
          this.nav.setRoot(ListPage);

      storage.get('status').then((val)=>{
        if(val == 'admin'){
            this.status = val;
        }
      })
        }
      });

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) { this.nav.setRoot(page.component); }
  gotoIntro(){ this.nav.setRoot(IntroPage); }
  gotoSettingpromotionPage(){ this.nav.push(SettingpromotionPage); }
  gotoSettingabout(){ this.nav.push(SettingaboutPage);  }
  gotoProfile(){ this.nav.push(ProfilePage);  }
  

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
