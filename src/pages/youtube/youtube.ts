import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { GetdataProvider } from '../../providers/getdata/getdata';
import { Subscription } from 'rxjs/Subscription';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
@Component({
  selector: 'page-youtube',
  templateUrl: 'youtube.html',
})
export class YoutubePage {
  sub : Subscription;
  errorMessage:string;
  list:any;
  VideoId:string;
  image:string;
  title:string;
  description:string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public getdataPvder: GetdataProvider,
              public platform: Platform,
              private youtube:YoutubeVideoPlayer
            
            ) {
              this.sub = this.getdataPvder.getListVideo().subscribe(
                (res)=>{
                  let item = res.length - 1;
                  console.log('Video ' + res[item].snippet.resourceId.videoId);
                  this.VideoId = res[item].snippet.resourceId.videoId;
                  this.image= res[item].snippet.thumbnails.high.url;
                  this.title= res[item].snippet.title;
                  this.description= res[item].snippet.description;                
                  this.list = res;
                }
              )


            }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YoutubePage');
  }

  playVideo(video){
    if(video == ''){
      video = this.VideoId;
    }
    if (this.platform.is('cordova') ){
      this.youtube.openVideo(video);

    }else{
      window.open('https://www.youtube.com/watch?v='+video)
    }
  }


}
