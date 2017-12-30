import { Component } from '@angular/core';
import { NavController, NavParams , ModalController } from 'ionic-angular';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Data } from '../../models/data';
import { Subscription } from 'rxjs/Subscription';
import { DetailPage } from '../../pages/detail/detail';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  getdata: Data[];
  icons: string[];
  sub: Subscription;
  errorMessage:string;
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public getdataPvder: GetdataProvider,
              public modalCtrl: ModalController
            
            ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

  }

  private GetListNews() {
    this.sub = this.getdataPvder.GetListNews('NewsList',5).subscribe(
      (res) => this.getdata = res,
      (error) => {this.errorMessage = <any> error
    });
  }


  gotoNews(c){
    // let profileModal = this.modalCtrl.create(DetailPage, { Data : c });
    // profileModal.present();

    this.navCtrl.push(DetailPage,{
      Data : c
    })

  }
  ionViewWillEnter(){
    this.GetListNews();
  }

}
