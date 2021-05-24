import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Appliance } from 'src/app/models/Appliance';
import { Signed } from 'src/app/models/Signed';
import { TemperatureRecord } from 'src/app/models/TemperatureRecord';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-add-edit-temperature-record',
  templateUrl: './add-edit-temperature-record.page.html',
  styleUrls: ['./add-edit-temperature-record.page.scss'],
})
export class AddEditTemperatureRecordPage implements OnInit {
  public title:string="";
  public temperatureRecord:TemperatureRecord;
  public count:number=0;

  public select_signed:Signed=null;
  public model_Select_Signed:string='Signed';
  public properti_model_Select:string="name";

  public select_appliance:Appliance=null;
  public model_Select_Appliance:string='appliance';
  public properti_model_Select_App:string="name";
   
  public form:FormGroup;

  constructor(private navParams:NavParams,private modalController: ModalController,private utils:UtilsService,
    private api:ApiService,private fb: FormBuilder,private auth:AuthenticationService) {
      this.temperatureRecord=this.navParams.get('obj');
      this.form=this.fb.group({
        temperature:['',[Validators.required]],
        date:['',[Validators.required]]
      })
     }

  ngOnInit() {
    if(this.temperatureRecord!=null){
      this.title="Editar Registro Temperatura";
      this.select_signed=this.temperatureRecord.signed;
      this.select_appliance=this.temperatureRecord.appliance;
      this.form.get('date').setValue(this.temperatureRecord.date);
      this.form.get('temperature').setValue(this.temperatureRecord.temperature);

    }else{
      this.title="Añadir Registro Temperatura";
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

    if(this.select_appliance!=null&&this.select_signed!=null){
      await this.utils.presentLoading();
      let date_format:string=this.form.get('date').value;
      let date=date_format.slice(0,10);

      if(this.temperatureRecord!=null){
        this.temperatureRecord.appliance=this.select_appliance;
        this.temperatureRecord.date=date;
        this.temperatureRecord.signed=this.select_signed;
        this.temperatureRecord.temperature=this.form.get('temperature').value;
        try {
          let added:TemperatureRecord=await this.api.updateRecordOfModel('TemperatureRecord',this.temperatureRecord);
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
        let toadd:TemperatureRecord={
          date:date,
          signed:this.select_signed,
          appliance:this.select_appliance,
          temperature:this.form.get('temperature').value,
          user:this.auth.userConfigSaved.user
        }
        try {
          let added=await this.api.addRecordOfModel('TemperatureRecord',toadd);
          if(added!=null){
            this.utils.presentToast("Se ha añadido correctamente","success",2000);
            this.count++;
            this.form.reset();
          }else{
            this.utils.presentToast("No se ha añadido correctamente","danger",2000);
          }
        } catch (error) {
          this.utils.showSnackBar(error,"OK");
        }
      }
      await this.utils.dismissLoading();
    }else{
      this.utils.showSnackBar("El ELECTRODOMÉSTICO y FIRMADO no pueden estar sin seleccionar","OK");
    }

  }

  public async deleteRecord(){
    if(this.temperatureRecord!=null){
      let acep=await this.utils.presentAlertConfirm('','Alerta','¿Seguro que desea borrar el registro?','CANCELAR','ACEPTAR');
      if(acep){
        await this.utils.presentLoading();
        try {
          let deleted:boolean= await this.api.deleteRecordOfModel("TemperatureRecord",this.temperatureRecord.id);
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
  public getSelectAppliance($event){
    this.select_appliance=$event;
  }

}
