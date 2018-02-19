import { Injectable } from '@angular/core';
import { Data } from '../../models/data';
import { Login } from '../../models/login';
import { Http , Response , HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Restaurant } from '../../models/restaurant';

/*
  Generated class for the GetdataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetdataProvider {
  url = 'http://www.pattayapal.com/';
  key:string = 'AIzaSyCt6PXdnwdBEYC7KfX0xd02tOyqhl5C2C4';
  playlist:string = 'PL79f4WYJSRRFacMRxolAwYEYDtag2jWnd';

  constructor( public http: Http) {
    console.log('Hello GetdataProvider Provider');
  }

  GetListNews(data:string,limit:number=0):Observable<Data[]> {
    return this.http.get(this.url+'api/getData.php?page='+data+'&limit='+limit)
    .map((res:Response)=><Data[]> res.json())
    .catch(this.handleError);
  }

  SelectUser(email:string,password:string):Observable<Login[]>{
    return this.http.get(this.url+'api/user.php?Mode=Select&Email='+email+'&Pass='+password)
    .map((res:Response)=><Login[]> res.json())
    .catch(this.handleError);    
  }

  getUser(email:any):Observable<Login[]>{
    return this.http.get(this.url+'api/user.php?Mode=getUser&Email='+email)
    .map((res:Response)=><Login[]> res.json())
    .catch(this.handleError);    
  }

  InsertUser(email:string,password:string,phone:number=0,sex:string=''):Observable<Login[]>{
    return this.http.get(this.url+'api/user.php?Mode=Insert&Email='+email+'&Pass='+password+'&Phone='+phone+'&Sex='+sex)
    .map((res:Response)=><Login[]> res.json())
    .catch(this.handleError);    
  }
  handleError(error:any) {
    return Observable.throw(error.json().errorMessage || 'เกิดข้อผิดพลาดจาก Server');
  }

  getabout(){
    return this.http.get(this.url+'api/user.php?Mode=GetAbout')
    .map((res:Response)=> ( res.json()) )
    .catch(this.handleError);    
  }

  saveabout(email:string,phone:number){
    return this.http.get(this.url+'api/user.php?Mode=SaveAbout&email='+email+'&phone='+phone )
    .map((res:Response)=> ( res.json()) )
    .catch(this.handleError);    
  }

  getPromotion(day:string){
    return this.http.get(this.url+'api/user.php?Mode=getPromotion&day='+day )
    .map((res:Response)=> ( res.json()) )
    .catch(this.handleError);    
  }

  savePromotion(title:string,detail:string,condition:string,id:string){
    return this.http.get(this.url+'api/user.php?Mode=savePromotion&title='+title+'&detail='+detail+'&condition='+condition+'&id='+id )
    .map((res:Response)=> ( res.json()) )
    .catch(this.handleError);    
  }
  saveRestaurant(title:string,detail:string,condition:string,lat:any,lng:any,price,id,owner=''){
    return this.http.get(this.url+'api/user.php?Mode=saveRestaurant&title='+title+'&short_detail='+detail+'&long_detail='+condition+'&lat='+lat+'&lng='+lng+'&price='+price+'&id='+id+'&owner='+owner)
    .map((res:Response)=> ( res.json()) )
    .catch(this.handleError);    
  }
  getRestaurant():Observable<Restaurant[]>{
    return this.http.get(this.url+'api/user.php?Mode=getRestaurant' )
    .map((res:Response)=><Restaurant[]>  res.json() )
    .catch(this.handleError);    
  }
  saveProfile(email:string,phone:number,sex:string,user_id:string){
    return this.http.get(this.url+'api/user.php?Mode=saveProfile&email='+email+'&phone='+phone+'&sex='+sex+'&user_id='+user_id )
    .map((res:Response)=> ( res.json()) )
    .catch(this.handleError);    
  }

  getListVideo(){
    return this.http.get("https://www.googleapis.com/youtube/v3/playlistItems?key="+this.key +"&playlistId="+this.playlist+"&part=snippet")   
    .map(res => {
     return res.json()['items'];
    })
  }

  promote(email,promotion_id){
    return this.http.get(this.url+'api/user.php?Mode=promote&email='+email+'&promotion_id='+promotion_id )
    .map((res:Response)=> ( res.json()) )
    .catch(this.handleError);    
  }

  getListPromoted(date){
    return this.http.get(this.url+'api/user.php?Mode=getListPromoted&day='+date)
    .map(res => {
      return res.json();
     })    
  }

  getRest(){
    return this.http.get(this.url+'api/user.php?Mode=getListRest')
    .map(res => {
      return res.json();
     })    
  }

  saveRest(title:string,detail:string,condition:string,lat:any,lng:any,price='',id='',phone='',owner=''){
    return this.http.get(this.url+'api/user.php?Mode=saveRest&title='+title+'&short_detail='+detail+'&long_detail='+condition+'&lat='+lat+'&lng='+lng+'&price='+price+'&id='+id+'&owner='+owner)
    .map((res:Response)=> ( res.json()) )
    .catch(this.handleError);    
  }
  getProperty(){
    return this.http.get(this.url+'api/user.php?Mode=getListProperty')
    .map(res => {
      return res.json();
     })       
  }
  saveProperty(title:string,detail:string,condition:string,lat:any,lng:any,price='',id='',phone='',owner=''){
    return this.http.get(this.url+'api/user.php?Mode=saveProperty&title='+title+'&short_detail='+detail+'&long_detail='+condition+'&lat='+lat+'&lng='+lng+'&price='+price+'&id='+id+'&phone='+phone+'&owner='+owner)
    .map((res:Response)=> ( res.json()) )
    .catch(this.handleError);    
  }

  getListMyShop(owner=''){
    return this.http.get(this.url+'api/user.php?Mode=GetListMyShop&owner='+owner )
    .map((res:Response)=> ( res.json()) )
    .catch(this.handleError);     
  }



}
