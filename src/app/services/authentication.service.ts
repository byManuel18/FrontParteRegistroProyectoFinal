import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { User } from '../models/User';
import { Confi } from '../models/Confi';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { UtilsService } from './utils.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public userConfigSaved:Confi=null;

  constructor(private afAuth: AngularFireAuth,private storage:NativeStorage,public plt: Platform,private api:ApiService,private router:Router,
    private utils:UtilsService) {
   }

   async canActivate(route:ActivatedRouteSnapshot):Promise<boolean>{
    return new Promise<boolean>(async (resolve,reyect)=>{
      await this.utils.presentLoading();
      try {
        let b:boolean=await this.isLogged();
        if(b){
          resolve(true);
          await this.utils.dismissLoading();
        }else{
          resolve(false);
          await this.utils.dismissLoading();
          this.router.navigate(["login"]);
        }
      } catch (error) {
        resolve(false);
        reyect(error);
        await this.utils.dismissLoading();
        this.router.navigate(["login"]);
      }
    })
  }

   async login(email:string,password:string,save:boolean):Promise<boolean>{ 
     return new Promise<boolean>(async(resolve,reyect)=>{
      await this.afAuth.auth.signInWithEmailAndPassword(email,password).then(async(data)=>{
        let uid:string=data.user.uid;
        let userT:User=await this.api.getUserByUid(uid);
        this.userConfigSaved={
          user:userT,
          language:-1,
          theme:-1,
        }
        if(save){
        
          await this.storage.setItem("myconfig",this.userConfigSaved).then((data)=>{
            resolve(true);
           }).catch((error)=>{
            reyect(error);
           })
        }else{
          resolve(true);
        }
       }).catch((error)=>{
         reyect(error);
       });
     });
     
   }

   async logout(){
     await this.afAuth.auth.signOut().then(()=>{
      
     }).catch((error)=>{
      console.log(error);
     });

     this.userConfigSaved=null;
     await this.storage.setItem("myconfig",this.userConfigSaved).then((data)=>{
     }).catch((error)=>{
       console.log(error);
     })
     this.utils.ControllerMenu(false,false);
     this.router.navigate(["login"]);
   }

   async isLogged():Promise<boolean>{
     return new Promise<boolean>(async (resolve,reyect)=>{
      if(this.userConfigSaved!=null){
        try {
          let u:User=await this.api.getUserByUid(this.userConfigSaved.user.uid);
          if(u.active){
            resolve(true);
          }else{
            resolve(false);
          }
        } catch (error) {
          resolve(false);
          reyect(error);
        }
      }else{
        resolve(false);
      }
     });
      
   }

   async init(){
    let configsave:Confi=await this.storage.getItem("myconfig");
    this.userConfigSaved=configsave;
   }


   async saveStorage(){
    await this.storage.setItem("myconfig",this.userConfigSaved).then((data)=>{
      
     }).catch((error)=>{
      
     })
   }



}
