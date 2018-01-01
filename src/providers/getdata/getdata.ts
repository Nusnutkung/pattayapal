import { Injectable } from '@angular/core';
import { Data } from '../../models/data';
import { Login } from '../../models/login';
import { Http , Response , HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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

  getListVideo(){
    return this.http.get("https://www.googleapis.com/youtube/v3/playlistItems?key="+this.key +"&playlistId="+this.playlist+"&part=snippet")   
    .map(res => {
     return res.json()['items'];
    })
  }

  
  }
