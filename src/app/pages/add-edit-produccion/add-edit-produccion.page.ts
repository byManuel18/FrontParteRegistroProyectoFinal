import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Production } from 'src/app/models/Production';
import { RawMaterialRecord } from 'src/app/models/RawMaterialRecord';
import { SelectSearch } from 'src/app/models/SelectSearch';
import { Signed } from 'src/app/models/Signed';
import { TableColumn } from 'src/app/models/table_colums';
import { TraceabilityOfMeat } from 'src/app/models/TraceabilityOfMeat';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';
import { TraceabilityOfMeatPage } from '../traceability-of-meat/traceability-of-meat.page';

@Component({
  selector: 'app-add-edit-produccion',
  templateUrl: './add-edit-produccion.page.html',
  styleUrls: ['./add-edit-produccion.page.scss'],
})
export class AddEditProduccionPage implements OnInit {

  public title:string="";
  public produccionRecord:Production;
  public count:number=0;

  public select_signed:Signed=null;
  public model_Select_Signed:string='Signed';
  public properti_model_Select:string="name";

  public form:FormGroup;

  public searachSelect_trazMeat:SelectSearch[]=[{id:"no",name:"Deshabilitado"},
  {id:"arrivaldate",name:"Fecha Llegada"},{id:"startdate",name:"Fecha Comienzo"},
  {id:"enddate",name:"Fecha Fin"}];

  public searachSelect_RawMaterial:SelectSearch[]=[{id:"no",name:"Deshabilitado"},{id:"commodity",name:"Producto"},
  {id:"lote",name:"Lote"},{id:"supplier",name:"Distribuidor"},{id:"arrivaldate",name:"Fecha Llegada"},{id:"startdate",name:"Fecha Comienzo"},
  {id:"enddate",name:"Fecha Fin"}]; 

  public columnstrazMeat:TableColumn<TraceabilityOfMeatPage>[]=[{label:"Producto",property:"meatrecord.product",type:"text",visible:true},
  {label:"Lote",property:"meatrecord.lote",type:"text",visible:true},
  {label:"Distribuidor",property:"meatrecord.supplier",type:"text",visible:true},
  {label:"Firmado",property:"signed.name",type:"text",visible:true},
  {label:"Fecha Llegada",property:"meatrecord.date",type:"date",visible:true},
  {label:"Fecha Comienzo",property:"startdate",type:"date",visible:true},
  {label:"Fecha Fin",property:"enddate",type:"date",visible:true},
  ];

  public columnsRawMaterial:TableColumn<RawMaterialRecord>[]=[{label:"Producto",property:"commodity",type:"text",visible:true},
  {label:"Lote",property:"lote",type:"text",visible:true},
  {label:"Distribuidor",property:"supplier",type:"text",visible:true},
  {label:"Firmado",property:"signed.name",type:"text",visible:true},
  {label:"Fecha Llegada",property:"arrival_date",type:"date",visible:true},
  {label:"Fecha Comienzo",property:"start_date",type:"date",visible:true},
  {label:"Fecha Fin",property:"end_date",type:"date",visible:true},
  ];
  
  public modeltrazmeat:string="TraceabilityOfMeat";
  public modeltrazRaxMaterial:string="RawMaterialRecord";

  public RawMaterialFristChargeEvent:boolean=false;
  public ionrefreshactivate:boolean=false;

  public listOfRawMaterial:RawMaterialRecord[]=[];
  public listaOfTrazOfMeat:TraceabilityOfMeat[]=[];

  constructor(private navParams:NavParams,private modalController: ModalController,private utils:UtilsService,
    private api:ApiService,private fb: FormBuilder,private auth:AuthenticationService) { 
      this.produccionRecord=this.navParams.get('obj');
      this.form=this.fb.group({
        product:['',[Validators.required]],
        amount:['',[Validators.required,Validators.pattern("^\\d{1,9}(\\.\\d{1,10})?$")]],
        date:['',[Validators.required]]
        
      });
    }

  ngOnInit() {

    if(this.produccionRecord!=null){
      this.title="Editar Registro Producción";
      this.listaOfTrazOfMeat=this.produccionRecord.listTraceabilityOfMeat;
      this.listOfRawMaterial=this.produccionRecord.listRawMaterialRecord;
      this.select_signed=this.produccionRecord.signed;
      this.form.get('product').setValue(this.produccionRecord.product);
      this.form.get('date').setValue(this.produccionRecord.date);
      this.form.get('amount').setValue(this.produccionRecord.amount);
    }else{
      this.title="Añadir Registro Producción";
    }

  }

  async AddTrazOfMeat($event){
    let existOnList:boolean=false;
    this.listaOfTrazOfMeat.forEach((value)=>{
      if(!existOnList){
        if(value.id==$event.id){
          existOnList=true;
        }
      }
    })
   
    if(existOnList){
      this.utils.presentToast("Ya está incluido","danger",1500);
    }else{
      let add:boolean=await this.utils.presentAlertConfirm("","¡Alerta!","¿Añadir a la lista?","Cancelar","Aceptar");
      if(add){
        this.listaOfTrazOfMeat.push($event);
      }
    }

  }

  async AddRawMaterial($event){

    let existOnList:boolean=false;
    this.listOfRawMaterial.forEach((value)=>{
      if(!existOnList){
        if(value.id==$event.id){
          existOnList=true;
        }
      }
    })
   
    if(existOnList){
      this.utils.presentToast("Ya está incluido","danger",1500);
    }else{
      let add:boolean=await this.utils.presentAlertConfirm("","¡Alerta!","¿Añadir a la lista?","Cancelar","Aceptar");
      if(add){
        this.listOfRawMaterial.push($event);
      }
    }

  }

  async deleteTrazOfMeat(row:TraceabilityOfMeat){
    let todelete:boolean=await this.utils.presentAlertConfirm("","¡Alerta!","¿Eliminar de la Lista?","Cancelar","Aceptar");
    if(todelete){
      let indice=this.listaOfTrazOfMeat.indexOf(row);
      this.listaOfTrazOfMeat.splice(indice,1);
    }
    
  }

  async deleteRawMaterial(row:RawMaterialRecord){
    let todelete:boolean=await this.utils.presentAlertConfirm("","¡Alerta!","¿Eliminar de la Lista?","Cancelar","Aceptar");
    if(todelete){
      let indice=this.listOfRawMaterial.indexOf(row);
      this.listOfRawMaterial.splice(indice,1);
    }
  }

  public async sendForm(){

    if(this.select_signed!=null){
      await this.utils.presentLoading();
      let formatdate:string=this.form.get('date').value;
      let date=formatdate.slice(0,10);
      if(this.produccionRecord!=null){
        this.produccionRecord.date=date;
        this.produccionRecord.amount=this.form.get('amount').value;
        this.produccionRecord.product=this.form.get('product').value;
        this.produccionRecord.signed=this.select_signed;
        this.produccionRecord.listRawMaterialRecord=this.listOfRawMaterial;
        this.produccionRecord.listTraceabilityOfMeat=this.listaOfTrazOfMeat;

        try {
          let added:Production=await this.api.updateRecordOfModel('Production',this.produccionRecord);
          if(added!=null){
            this.utils.presentToast("Actualizado correctamente","success",2000);
            this.modalController.dismiss(true);
          }else{
            this.utils.presentToast("No se ha actualizado correctamente","danger",2000);
          }
        } catch (error) {
          console.log(error);
          this.utils.showSnackBar(error,"OK");
        }
      }else{
        let toadd:Production={
          amount:this.form.get('amount').value,
          date:date,
          product:this.form.get('product').value,
          signed:this.select_signed,
          user:this.auth.userConfigSaved.user,
          listRawMaterialRecord:this.listOfRawMaterial,
          listTraceabilityOfMeat:this.listaOfTrazOfMeat
        }
        try {
          let added:Production=await this.api.addRecordOfModel('Production',toadd);
          if(added!=null){
            this.utils.presentToast("Se ha añadido correctamente","success",2000);
            this.count++;
            this.form.reset();
            this.listaOfTrazOfMeat=[];
            this.listOfRawMaterial=[];
          }else{
            this.utils.presentToast("No se ha añadido correctamente","danger",2000);
          }
        } catch (error) {
          this.utils.showSnackBar(error,"OK");
        }
      }

      await this.utils.dismissLoading();
    }else{
      this.utils.showSnackBar("FIRMADO no puede estar sin seleccionar","OK");
    }

  }

  public async deleteRecord(){
    if(this.produccionRecord!=null){
      let acep=await this.utils.presentAlertConfirm('','Alerta','¿Seguro que desea borrar el registro?','CANCELAR','ACEPTAR');
      if(acep){
        await this.utils.presentLoading();
        try {
          let deleted:boolean= await this.api.deleteRecordOfModel("Production",this.produccionRecord.id);
          if(deleted){
            await this.utils.dismissLoading();
            this.utils.presentToast("Eliminado correctamente","success",2000);
            this.modalController.dismiss(true);
          }else{
            await this.utils.dismissLoading();
            this.utils.presentToast("No se ha podido eliminar","danger",2000);
          } 
        } catch (error) {
          await this.utils.dismissLoading();
          this.utils.showSnackBar(error,"OK");
        }
      }
    }
  }

  public getOut(){
    let refresh:boolean=false;
    if(this.count>0){
      refresh=true;
    }
    this.modalController.dismiss(refresh);
  }

  
  public getSelectSigned($event){
    this.select_signed=$event;
  }

}
