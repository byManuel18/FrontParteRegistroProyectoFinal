import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Condition } from 'src/app/models/Condition';
import { Signed } from 'src/app/models/Signed';
import { WatterRecord } from 'src/app/models/WatterRecord';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-edit-watter-record',
  templateUrl: './add-edit-watter-record.page.html',
  styleUrls: ['./add-edit-watter-record.page.scss'],
})
export class AddEditWatterRecordPage implements OnInit {

  public tittle:string="";
  public watterRecord:WatterRecord;

  public select_signed:Signed=null;
  public select_condition:Condition=null;
  public model_Select_Signed:string='Signed';
  public model_Select_Condition:string='Condition';
  public properti_model_Select:string="name";

  public count:number=0;

  public form:FormGroup;

  constructor(private navParams:NavParams,private modalController: ModalController,private utils:UtilsService,
    private api:ApiService,private fb: FormBuilder,private auth:AuthenticationService) {
      this.watterRecord=this.navParams.get('obj');
      this.form=this.fb.group({
        samplingpoint:['',[Validators.required]],
        organoleptic_control:['',[Validators.required,Validators.pattern("^\\d{1,9}(\\.\\d{1,10})?$")]],
        date:['',[Validators.required]]
      });
     }

  ngOnInit() {
    if(this.watterRecord!=null){
      this.tittle="Editar Registro Agua";
      this.form.get('samplingpoint').setValue(this.watterRecord.samplingpoint);
      this.form.get('organoleptic_control').setValue(this.watterRecord.organoleptic_control);
      this.form.get('date').setValue(this.watterRecord.date);
      this.select_condition=this.watterRecord.condition;
      this.select_signed=this.watterRecord.signed;
    }else{
      this.tittle="Añadir Registro Agua";
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
    if(this.select_signed!=null&&this.select_condition!=null){
      await this.utils.presentLoading();
      let date_format:string=this.form.get('date').value;
      let date=date_format.slice(0,10);
      if(this.watterRecord!=null){
        this.watterRecord.date=date;
        this.watterRecord.samplingpoint=this.form.get('samplingpoint').value;
        this.watterRecord.organoleptic_control=this.form.get('organoleptic_control').value;
        this.watterRecord.condition=this.select_condition;
        this.watterRecord.signed=this.select_signed;
        try {
          let updatedRecord:WatterRecord=await this.api.updateRecordOfModel('WatterRecord',this.watterRecord);
          if(updatedRecord!=null){
            this.utils.presentToast("Actualizado correctamente","success",2000);
            this.modalController.dismiss(true);
          }else{
            this.utils.presentToast("No se ha actualizado correctamente","danger",2000);
          }
        } catch (error) {
           this.utils.showSnackBar(error,"OK");
        }
      }else{
        let toadd:WatterRecord={
          condition:this.select_condition,
          signed:this.select_signed,
          date:date,
          samplingpoint:this.form.get('samplingpoint').value,
          organoleptic_control:this.form.get('organoleptic_control').value,
          user:this.auth.userConfigSaved.user,
        }

        try {
          let added=await this.api.addRecordOfModel('WatterRecord',toadd);
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
      this.utils.showSnackBar("El ESTADO y FIRMADO no pueden estar sin seleccionar","OK");
    }
  }

  public async deleteRecord(){
    if(this.watterRecord!=null){
      let acep=await this.utils.presentAlertConfirm('','Alerta','¿Seguro que desea borrar el registro?','CANCELAR','ACEPTAR');
      if(acep){
        await this.utils.presentLoading();
        try {
          let deleted:boolean= await this.api.deleteRecordOfModel("WatterRecord",this.watterRecord.id);
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

  public getSelectCondition($event){
    this.select_condition=$event;
  }

}
