import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  constructor(private httpApi:HTTP) {
  
  }

  public getUserByUid(uid:string):Promise<User|null>{
    const url=environment.endpointApi+environment.userpoint+uid;
    return new Promise((resolve,reyect)=>{
        this.httpApi.get(url,{},this.header).then((data)=>{
          if(data){
            let u:User=JSON.parse(data.data);
            resolve(u);
          }else{
            resolve(null);
          }
        }).catch((error)=>{
          reyect(error);
        });
    });
  }

  public getAnyForSelect(model:string,uid:string=null):Promise<any[]|null>{
    let url:string=environment.endpointApi+model.toLowerCase()+environment.selectPoint
    if(uid!=null){
      url+="/"+uid;
    }
    return new Promise((resolve,reyect)=>{
      this.httpApi.get(url,{},this.header).then((data)=>{
        if(data){
          let arraySelect:any=JSON.parse(data.data);
          resolve(arraySelect);
        }else{
          resolve(null);
        }
      }).catch((error)=>{
        reyect(error);
      })
    });
  }

  public getAllByModel(uid:string,model:string,size:number,page:number,params:any):Promise<any[]|null>{
    const url=environment.endpointApi+model.toLowerCase()+"/getBy/"+uid+"/"+page+"/"+size;
    return new Promise((resolve,reyect)=>{
      this.httpApi.get(url,params,this.header).then((data)=>{
        if(data){
          let arrayAny:any[]=JSON.parse(data.data);
          resolve(arrayAny);
        }else{
          resolve(null);
        }
      }).catch((error)=>{
        reyect(error);
      })
    });
  }

  public getPagesByModel(uid:string,model:string,size:number,params:any):Promise<number>{
    const url=environment.endpointApi+model.toLowerCase()+"/getPages/"+uid+"/"+size;
    return new Promise((resolve,reyect)=>{
      this.httpApi.get(url,params,this.header).then((data)=>{
        if(data){
          let pages:number=data.data;
          resolve(pages);
        }else{
          resolve(0);
        }
      }).catch((error)=>{
        reyect(error);
      })
    });
  }

  public deleteRecordOfModel(model:string,id:number):Promise<boolean>{
    const url=environment.endpointApi+model.toLowerCase()+"/"+id;
    return new Promise<boolean>((resolve,reyect)=>{
      this.httpApi.delete(url,{},this.header).then((data)=>{
        if(data){
          let deleted:boolean=data.data;
          resolve(deleted);
        }else{
          resolve(false);
        }
      }).catch((error)=>{
        reyect(error)
      })
    });
  }

  public addRecordOfModel(model:string,obj:any):Promise<any|null>{
    const url=environment.endpointApi+model.toLowerCase();
    return new Promise<any|null>((resolve,reyect)=>{
      this.httpApi.setDataSerializer('json');
      this.httpApi.post(url,obj,this.header).then((data)=>{
        if(data){
          let objectresult:any=JSON.parse(data.data);
          resolve(objectresult);
        }else{
          resolve(null);
        }
      }).catch((error)=>{
        reyect(error);
      });
    })
  }

  public updateRecordOfModel(model:string,obj:any):Promise<any|null>{
    const url=environment.endpointApi+model.toLowerCase();
    return new Promise<any|null>((resolve,reyect)=>{
      this.httpApi.setDataSerializer('json');
      this.httpApi.put(url,obj,this.header).then((data)=>{
        if(data){
          let objectresult:any=JSON.parse(data.data);
          resolve(objectresult);
        }else{
          resolve(null);
        }
      }).catch((error)=>{
        reyect(error);
      });
    })
  }

  public updateUser(user:User,passW:string):Promise<boolean>{
    return new Promise((resolve,reyect)=>{
      const endpoint=environment.endpointApi+environment.userpoint+passW;
      this.httpApi.setDataSerializer('json');
      this.httpApi.put(endpoint,user,this.header).then((d)=>{
        if(d){
          let b:boolean=JSON.parse(d.data);
          resolve(b);
        }else{
          resolve(false);
        }
      }).catch(e=>reyect(e));
    });
  }


  private get header(){
    return{
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json',
      'apikey':environment.claveApi
    }
  }

}
