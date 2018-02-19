import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,AlertController } from 'ionic-angular';
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
import { RestPage } from '../pages/rest/rest';
import { PropertyPage } from '../pages/property/property';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Events } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { MyshopPage } from '../pages/myshop/myshop';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  email:any;
  status:boolean = false;
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
              public getdataPvder:GetdataProvider,
              public auth:AuthServiceProvider,
              public events: Events,
              public fb:Facebook,
              private qrScanner: QRScanner
            ) {
              events.subscribe('user:login', (user_id='' , user='',status='user',image='',type=0) => {
                // user and time are the same arguments passed in `events.publish(user, time)`
                this.email = user
                if(status == 'admin') this.status = true;
                this.user_id = user_id;
                if(type==0){
                  this.image = 'http://www.pattayapal.com/api/images/users/'+user_id+'.jpg';
                }else if(type==1){
                  this.image = image;
                }
              });

              events.subscribe('user:logout', (succ) => {
                this.email = ''
                this.status = false;
                this.user_id = '';
                this.image = 'http://www.pattayapal.com/api/images/users/no_profile.jpg';

              });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Featured', component: HomePage },
      // { title: 'News', component: ListPage },
      { title: 'Free Gifts', component: FreegiftPage },
      { title: 'ร้านอาหาร', component: RestaurantPage },
      { title: 'ที่พัก', component: RestPage },
      // { title: 'Shopping', component: CommingsoonPage },
      { title: 'Playlists', component: YoutubePage },
      // { title: 'Job & Properties', component: PropertyPage },
      // { title: 'Youtube', component: YoutubePage },
      // { title: 'เกี่ยวกับ', component: AboutusPage },
      { title: 'การตั้งค่า', component: SettingPage }
      


    ];





    // this.splashScreen.hide();
    this.initializeApp();

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('Email').then((val) => {   
        let info = this.auth.getUserInfo();
        this.email = info;
        // console.log('email ' + this.email);

        if(val != null){
          this.email = val; 
          this.sub = this.getdataPvder.getUser(val).subscribe(
            (res) =>{
              this.user_id = res['user_id'];
              this.image = 'http://www.pattayapal.com/api/images/users/'+res["user_id"]+'.jpg';

            }
          )

          
          // this.nav.setRoot(HomePage);
          this.rootPage = HomePage;
      this.storage.get('status').then((val)=>{
        if(val == 'admin'){
            this.status = true;
        }
      })
        }else{
          this.fb.getLoginStatus().then( (res)=>{
            if(res.status=='connected'){
              this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',[] ).then(profile => {
                this.auth.setUser('', profile['email'],'user','','',profile['picture_large']['data']['url']  )  
                this.events.publish('user:login', '' ,profile['email'], 'user' ,profile['picture_large']['data']['url'] ,1);
            })

              this.rootPage = HomePage;
            }else{
              this.rootPage = IntroPage;
            }

            })

          
        }
      });



    });
  }

  openPage(page) { this.nav.setRoot(page.component); }
  gotoIntro(){ this.nav.setRoot(IntroPage); }
  gotoSettingpromotionPage(){ this.nav.push(SettingpromotionPage); }
  gotoSettingabout(){ this.nav.push(SettingaboutPage);  }
  gotoProfile(){ this.nav.push(ProfilePage);  }
  gotopromoted(){ this.nav.push(GetpromotedPage);  }
  gotoSettingAds(){ this.nav.push(SettingadsPage); }
  gotoMyshop(){this.nav.push(MyshopPage)}
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


scanQRCode(){
  console.log('scanQRCode');
  this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
      console.log('status authorized');
       // camera permission was granted


       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);

         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

       // show camera preview
       this.qrScanner.show();

       // wait for user to scan something, then the observable callback will be called

     } else if (status.denied) {
      console.log('status denied');
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
}
}
