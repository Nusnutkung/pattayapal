import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AboutusPage } from '../pages/aboutus/aboutus';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { UploadModalPage} from '../pages/upload-modal/upload-modal';
import { SettingpromotionPage } from '../pages/settingpromotion/settingpromotion';
import { SettingaboutPage } from '../pages/settingabout/settingabout';
import { IntroPage } from '../pages/intro/intro';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GetdataProvider } from '../providers/getdata/getdata';
import { HttpModule } from '@angular/http';
import { DetailPage } from '../pages/detail/detail';
import { YoutubePage } from '../pages/youtube/youtube';
import { SettingadsPage } from '../pages/settingads/settingads';
import { UploadimageadsPage } from '../pages/uploadimageads/uploadimageads';
import { GetpromotedPage } from '../pages/getpromoted/getpromoted';
import { SettingPage } from '../pages/setting/setting';
import { ProfilePage } from '../pages/profile/profile';
import { FreegiftPage } from '../pages/freegift/freegift';
import { RegisterPage } from '../pages/register/register';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { NearmePage } from '../pages/nearme/nearme';
import { CommingsoonPage } from '../pages/commingsoon/commingsoon';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { RestaurantPage } from '../pages/restaurant/restaurant';
import { SettingrestaurantPage } from '../pages/settingrestaurant/settingrestaurant';
import { RestaurantdetailPage } from '../pages/restaurantdetail/restaurantdetail';
import { RestPage } from '../pages/rest/rest';
import { SettingrestPage } from '../pages/settingrest/settingrest';
import { RestdetailPage } from '../pages/restdetail/restdetail';
import { PropertyPage } from '../pages/property/property';
import { SettingpropertyPage } from '../pages/settingproperty/settingproperty';
import { PropertydetailPage } from '../pages/propertydetail/propertydetail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    IntroPage,
    AboutusPage,
    DetailPage,
    SettingPage,
    FreegiftPage,
    RegisterPage,
    SettingpromotionPage,
    UploadModalPage,
    SettingaboutPage,
    YoutubePage,
    ProfilePage,
    GetpromotedPage,
    SettingadsPage,
    UploadimageadsPage,
    NearmePage,
    CommingsoonPage,
    RestaurantPage,
    SettingrestaurantPage,
    RestaurantdetailPage,
    RestPage,
    SettingrestPage,
    RestdetailPage,
    PropertyPage,
    SettingpropertyPage,
    PropertydetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    IntroPage,
    AboutusPage,
    DetailPage,
    SettingPage,
    FreegiftPage,
    RegisterPage,
    SettingpromotionPage,
    UploadModalPage,
    SettingaboutPage,
    YoutubePage,
    ProfilePage,
    GetpromotedPage,
    SettingadsPage,
    UploadimageadsPage,
    NearmePage,
    CommingsoonPage,
    RestaurantPage,
    SettingrestaurantPage,
    RestaurantdetailPage,
    RestPage,
    SettingrestPage,
    RestdetailPage,
    PropertyPage,
    SettingpropertyPage,
    PropertydetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetdataProvider,
    Camera,
    Transfer,
    FilePath,
    File,
    YoutubeVideoPlayer,
    GoogleMaps,
    Geolocation
    
  ]
})
export class AppModule {

  nut(){
    
  }
}
