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
      { title: 'Free Gift', component: FreegiftPage },
      { title: 'เกี่ยวกับ', component: AboutusPage },
      { title: 'การตั้งค่า', component: SettingPage }

    ];


      storage.get('Email').then((val) => {
        console.log('Email ' + val)
        
        if(val != null){
          this.email = val ;
          this.nav.setRoot(ListPage);

      storage.get('status').then((val)=>{
        console.log('va ' + val)
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    // this.nav.push(page.component);
  }
  gotoIntro(){ this.nav.setRoot(IntroPage); }
  gotoSettingpromotionPage(){ this.nav.push(SettingpromotionPage); }
  gotoSettingabout(){ this.nav.push(SettingaboutPage);  }

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
