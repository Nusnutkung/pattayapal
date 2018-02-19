// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http , Response , HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { Login } from '../../models/login';
import { Storage } from '@ionic/storage';
export class User {
  email: any = '';
  status: any = '';
  sex: any = '';
  phone: any = '';
  user_id: any = '';
  image:any;
  
 
  constructor(user_id: string='', email: string='',status: string='',sex: string='',phone:string='',image='') {
    this.user_id = name;
    this.email = email;
    this.status = status;
    this.sex = sex;
    this.phone = phone;
    this.image = image;

  }
}

@Injectable()
export class AuthServiceProvider {
  currentUser: User;
  user=''
  pass=''
  url = 'http://www.pattayapal.com/';

  constructor(public http: Http,public storage:Storage) {
    console.log('Hello AuthServiceProvider Provider');
  }
  public login(credentials) {
    console.log('email ' + credentials.email);
    console.log('pass ' + credentials.password);

    if (credentials.email == '' || credentials.password == '') {
      return Observable.throw("กรุณาใส่ข้อมูลให้ครบ");
    } else {

      
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!

        this.http.get(this.url+'api/user.php?Mode=Select&Email='+credentials.email+'&Pass='+credentials.password)
        .map(res => res.json())
        .subscribe(data =>{
          if(data == null){
            let access = { 'success': false ,'user_id':'', 'email': '' , 'status' : '' };
            observer.next(access);
            observer.complete();
          }else{
                console.log('login Success' + JSON.stringify(data));   
            this.storage.set('Email',data.email)
            this.storage.set('status',data.status)
            this.storage.set('user_id',data.user_id)
            // let access = true;
            let access = { 'success': true ,'user_id':data.user_id, 'email': data.email , 'status' : data.status };
            this.currentUser = new User(data.user_id, data.email,data.status,data.sex,data.phone);
            observer.next(access);
            observer.complete();         
          }
        })

      });
    }
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
  public setUser(user_id='',email='',status='',sex='',phone='',image=''){
    this.currentUser = new User(user_id, email,status, sex, phone,image);
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      this.storage.set('Email', null)
      this.storage.set('status', null)
      this.storage.set('user_id', null)
      observer.next(true);
      observer.complete();
    });
  }

  SelectUser(email:string,password:string):Observable<Login[]>{
    return this.http.get(this.url+'api/user.php?Mode=Select&Email='+email+'&Pass='+password)
    .map((res:Response)=><Login[]> res.json())  
  }

}

