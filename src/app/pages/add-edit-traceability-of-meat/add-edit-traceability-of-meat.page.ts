import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { MeatRecord } from 'src/app/models/MeatRecord';
import { SelectSearch } from 'src/app/models/SelectSearch';
import { Signed } from 'src/app/models/Signed';
import { TableColumn } from 'src/app/models/table_colums';
import { TraceabilityOfMeat } from 'src/app/models/TraceabilityOfMeat';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-add-edit-traceability-of-meat',
  templateUrl: './add-edit-traceability-of-meat.page.html',
  styleUrls: ['./add-edit-traceability-of-meat.page.scss'],
})
export class AddEditTraceabilityOfMeatPage implements OnInit {
  
  public title:string="";
  public trazOfMeat:TraceabilityOfMeat=null;
  public selectedMeatRecord:MeatRecord=null;
  public count:number=0;

  public select_signed:Signed=null;
  public model_Select_Signed:string='Signed';
  public properti_model_Select:string="name";
  

  public form:FormGroup;

  public searachSelect:SelectSearch[]=[{id:"no",name:"Disabled"},{id:"product",name:"Product"},
  {id:"lote",name:"Lote"},{id:"date",name:"Date"},{id:"supplier",name:"Supplier"}];

  public columns:TableColumn<MeatRecord>[]=[{label:"Product",property:"product",type:"text",visible:true},
  {label:"Supplier",property:"supplier",type:"text",visible:true},
  {label:"Lote",property:"lote",type:"text",visible:true},
  {label:"Date",property:"date",type:"date",visible:true}
  ];
  public model:string="MeatRecord";
  public ref:any=null;
  
  constructor(private navParams:NavParams,private modalController: ModalController,private utils:UtilsService,
    private api:ApiService,private fb: FormBuilder,private auth:AuthenticationService) { 
      this.trazOfMeat=this.navParams.get('obj');
      this.form=this.fb.group({
        producto:['',[Validators.required]],
        supplier:['',[Validators.required]],
        lote:['',[Validators.required]],
        arrivaldate:['',[Validators.required]],
        startdate:['',[Validators.required]],
        enddate:['',[Validators.required]]
      });
    }

  ngOnInit() {
    if(this.trazOfMeat!=null){
      this.title="Editar Trazabilidad Carne";
      this.selectedMeatRecord=this.trazOfMeat.meatrecord;
      this.form.get('producto').setValue(this.trazOfMeat.meatrecord.product);
      this.form.get('lote').setValue(this.trazOfMeat.meatrecord.lote);
      this.form.get('supplier').setValue(this.trazOfMeat.meatrecord.supplier);
      this.form.get('arrivaldate').setValue(this.trazOfMeat.meatrecord.date);
      this.form.get('startdate').setValue(this.trazOfMeat.startdate);
      this.form.get('enddate').setValue(this.trazOfMeat.enddate);
      this.select_signed=this.trazOfMeat.signed;
    }else{
      this.title="Añadir Trazabilidad Carne";
    }
  }

  public getOut(){
    let refresh:boolean=false;
    if(this.count>0){
      refresh=true;
    }
    this.modalController.dismiss(refresh);
  }

  public async sendForm(){

    if(this.select_signed!=null){
      await this.utils.presentLoading();
      let formatstartdate:string=this.form.get('startdate').value;
      let formatenddate:string=this.form.get('enddate').value;
      if(this.trazOfMeat!=null){
        this.trazOfMeat.meatrecord=this.selectedMeatRecord;
        this.trazOfMeat.enddate=formatenddate.slice(0,10);
        this.trazOfMeat.signed=this.select_signed;
        this.trazOfMeat.startdate=formatstartdate.slice(0,10);
        this.trazOfMeat.arrivaldate=this.selectedMeatRecord.date;
        try {
          let added:TraceabilityOfMeat=await this.api.updateRecordOfModel('TraceabilityOfMeat',this.trazOfMeat);
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
        let toadd:TraceabilityOfMeat={
          arrivaldate:this.selectedMeatRecord.date,
          enddate:formatenddate.slice(0,10),
          meatrecord:this.selectedMeatRecord,
          signed:this.select_signed,
          startdate:formatstartdate.slice(0,10),
          user:this.auth.userConfigSaved.user
        }
        console.log(toadd);
        try {
          let added=await this.api.addRecordOfModel('TraceabilityOfMeat',toadd);
          if(added!=null){
            this.utils.presentToast("Se ha añadido correctamente","success",2000);
            this.count++;
            this.form.reset();
          }else{
            this.utils.presentToast("No se ha añadido correctamente","danger",2000);
          }
        } catch (error) {
          console.log(error);
          this.utils.showSnackBar(error,"OK");
        }
      }
      await this.utils.dismissLoading();
    }else{
      this.utils.showSnackBar("FIRMADO no pueden estar sin seleccionar","OK");
    }
  }

  public async deleteRecord(){
    if(this.trazOfMeat!=null){
      let acep=await this.utils.presentAlertConfirm('','Alerta','¿Seguro que desea borrar el registro?','CANCELAR','ACEPTAR');
      if(acep){
        await this.utils.presentLoading();
        try {
          let deleted:boolean= await this.api.deleteRecordOfModel("TraceabilityOfMeat",this.trazOfMeat.id);
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

  public getSelectSigned($event){
    this.select_signed=$event;
  }
  public SelectMeat($event){
    this.selectedMeatRecord=$event;
    this.form.get('producto').setValue(this.selectedMeatRecord.product);
    this.form.get('lote').setValue(this.selectedMeatRecord.lote);
    this.form.get('supplier').setValue(this.selectedMeatRecord.supplier);
    this.form.get('arrivaldate').setValue(this.selectedMeatRecord.date);
  }
}
