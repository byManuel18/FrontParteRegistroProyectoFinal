import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appliance } from 'src/app/models/Appliance';
import { SelectSearch } from 'src/app/models/SelectSearch';
import { TableColumn } from 'src/app/models/table_colums';
import { TemperatureRecord } from 'src/app/models/TemperatureRecord';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PdfService } from 'src/app/services/pdf.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddEditTemperatureRecordPage } from '../add-edit-temperature-record/add-edit-temperature-record.page';

@Component({
  selector: 'app-temperature-record',
  templateUrl: './temperature-record.page.html',
  styleUrls: ['./temperature-record.page.scss'],
})
export class TemperatureRecordPage implements OnInit {

  public searachSelect:SelectSearch[]=[{id:"no",name:"Deshabilitado"},
  {id:"date",name:"Fecha"}];

  public columns:TableColumn<TemperatureRecordPage>[]=[{label:"Electrodomestico",property:"appliance.name",type:"text",visible:true},
  {label:"Temperatura (ºC)",property:"temperature",type:"text",visible:true},
  {label:"Firmado",property:"signed.name",type:"text",visible:true},
  {label:"Fecha",property:"date",type:"date",visible:true}
  ]; 
  
  public model:string="TemperatureRecord";
  public ref:any=AddEditTemperatureRecordPage;

  public appliances:Appliance[]=[];
  public applianceEdit:Appliance=null;

  public form:FormGroup;
  private data:TemperatureRecord[]=[];

  constructor(private utils:UtilsService,private api:ApiService,private auth:AuthenticationService,
    private fb: FormBuilder,private pdf:PdfService) { 
      this.form=this.fb.group({
        name:['',Validators.required]
      });
    }

  ngOnInit() {
    this.cargaDatos();
  }

  async cargaDatos(event:boolean=false){
    if(event){
      this.utils.presentLoading();
    }
    try {
      this.appliances=await this.api.getAnyForSelect("appliance",this.auth.userConfigSaved.user.uid);
    } catch (error) {
      console.log(error);
    }

    if(event){
      this.utils.dismissLoading();
    }
  }

  async deleteAppliance(app:Appliance){
    let acep=await this.utils.presentAlertConfirm('','Alerta','¿Seguro que desea borrar el registro?','CANCELAR','ACEPTAR');
    if(acep){
      try {
        let deleted:boolean=await  this.api.deleteRecordOfModel('appliance',app.id);
        if(deleted){
          await this.cargaDatos(true);
          this.utils.presentToast("Eliminado correctamente","success",2000);
        }else{
          this.utils.presentToast("No se ha podido eliminar","danger",2000);
        }
      } catch (error) {
        this.utils.showSnackBar(error,"OK");
      }
    }
  }

  async sendForm(){
    await this.utils.presentLoading();
    if(this.applianceEdit!=null){
      this.applianceEdit.name=this.form.get('name').value;
      try {
        let edit:Appliance=await this.api.updateRecordOfModel('appliance',this.applianceEdit);
        if(edit!=null){
          this.cargaDatos(true);
          this.utils.presentToast("Editado correctamente","success",2000);
        }else{
          this.utils.presentToast("No se ha podido editar","danger",2000);
        }
      } catch (error) {
        this.utils.showSnackBar(error,"OK");
      }
    }else{
      let newApp:Appliance={
        name:this.form.get('name').value,
        user:this.auth.userConfigSaved.user
      }

      try {
        let added:Appliance=await this.api.addRecordOfModel('appliance',newApp);
        if(added!=null){
          this.cargaDatos(true);
          this.utils.presentToast("Añadidodo correctamente","success",2000);
        }else{
          this.utils.presentToast("No se ha podido añadir","danger",2000);
        }
      } catch (error) {
        this.utils.showSnackBar(error,"OK");
      }
    }
    this.reset();
    await this.utils.dismissLoading();
  }

  editAppliance(app:Appliance){
    this.applianceEdit=app;
    this.form.get('name').setValue(app.name);
  }

  reset(){
    this.form.reset();
    this.applianceEdit=null;
  }


  public getDates(MeatRecords:TemperatureRecord[]){
    this.data=MeatRecords;
  }

  public async doPDF(){
    
    let body:any[]=[];
    body.push(["ELECTRODOMÉSTICO","TEMPERATURA","FECHA","FIRMADO"]);
    this.data.forEach((element)=>{
      body.push([element.appliance.name,element.temperature,element.date,element.signed.name]);
    });
    await this.pdf.generatePdf(body,"Registro Temperatura");
  }


}
