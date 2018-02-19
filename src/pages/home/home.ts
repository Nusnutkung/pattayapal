import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Data } from '../../models/data';
import { DetailPage } from '../detail/detail';
import { NearmePage } from '../nearme/nearme';
import { RestaurantdetailPage } from '../restaurantdetail/restaurantdetail';
import { FreegiftPage } from '../freegift/freegift';
import { RestaurantPage } from '../restaurant/restaurant';
import { RestPage } from '../rest/rest';
import { RestdetailPage } from '../restdetail/restdetail';
import { PropertydetailPage } from '../propertydetail/propertydetail';
import { PropertyPage } from '../property/property';
import { AuthServiceProvider, User } from '../../providers/auth-service/auth-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Ads: any;
  News: any;
  AdsII: any;
  getdata: Data[];
  restaurantList: any;
  travelList:any;
  sub: Subscription;
  errorMessage:string;
  restList:any;
  PropertyList:any;
  username='';
  email='';
  constructor(public navCtrl: NavController,
              public getdataPvder: GetdataProvider,
              public auth:AuthServiceProvider

  ) {
    // let info = this.auth.getUserInfo();
    // this.username = info['name'];
    // this.email = info['email'];


    this.sub = this.getdataPvder.GetListNews('Ads',5).subscribe(
      (res) => this.Ads = res,
      (error) => {this.errorMessage = <any> error
    });

    this.GetListNews();
    // this.GetListTravel();
    this.GetListRestaurant();
    this.GetListRest();
    // this.GetListProperty();

  }
 
  
  private GetListNews() {
    this.sub = this.getdataPvder.GetListNews('News',5).subscribe(
      (res) => this.getdata = res,
      (error) => {this.errorMessage = <any> error
    });
  }
  private GetListTravel() {
    this.sub = this.getdataPvder.GetListNews('Travel',5).subscribe(
      (res) => this.travelList = res,
      (error) => {this.errorMessage = <any> error
    });
  }
  private GetListRestaurant() {
    this.sub = this.getdataPvder.getRestaurant().subscribe(
      (res) => this.restaurantList = res,
      (error) => {this.errorMessage = <any> error
    });
  }
  private GetListRest() {
    this.sub = this.getdataPvder.getRest().subscribe(
      (res) => this.restList = res,
      (error) => {this.errorMessage = <any> error
    });
  }
  private GetListProperty() {
    this.sub = this.getdataPvder.getProperty().subscribe(
      (res) => this.PropertyList = res,
      (error) => {this.errorMessage = <any> error
    });
  }

  // slideChanged() { this.slides.startAutoplay(); }

feature(){ }

nearme(){ this.navCtrl.setRoot(NearmePage); }
freegift(){this.navCtrl.push(FreegiftPage)}
restaurent(){this.navCtrl.push(RestaurantPage)}
rest(){this.navCtrl.push(RestPage)}
Property(){this.navCtrl.push(PropertyPage)}

gotorest(c){this.navCtrl.push(RestdetailPage,{Data:c})}
gotoNews(c){ this.navCtrl.push(DetailPage,{ Data : c }) }
gotores(c){ this.navCtrl.push(RestaurantdetailPage,{ Data : c }) }
gotoproperty(c){this.navCtrl.push(PropertydetailPage,{Data:c})}


}