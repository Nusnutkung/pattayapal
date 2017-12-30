import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Data } from '../../models/data';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  Ads: any;
  News: any;
  AdsII: any;
  getdata: Data[];
  sub: Subscription;
  errorMessage:string;
  constructor(public navCtrl: NavController,
              public getdataPvder: GetdataProvider
  ) {


    this.sub = this.getdataPvder.GetListNews('Ads',5).subscribe(
      (res) => this.Ads = res,
      (error) => {this.errorMessage = <any> error
    });

    this.GetListNews();


  }
  private GetListNews() {
    this.sub = this.getdataPvder.GetListNews('NewsList',5).subscribe(
      (res) => this.getdata = res,
      (error) => {this.errorMessage = <any> error
    });
  }

  slideChanged() { this.slides.startAutoplay(); }



}
