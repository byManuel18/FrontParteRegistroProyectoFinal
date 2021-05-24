import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Signed } from 'src/app/models/Signed';
import { WasteRecord } from 'src/app/models/WasteRecord';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-edit-waste-record',
  templateUrl: './add-edit-waste-record.page.html',
  styleUrls: ['./add-edit-waste-record.page.scss'],
})
export class AddEditWasteRecordPage implements OnInit {
  
  public title:string="";
  public wasteRecord:WasteRecord;
  public count:number=0;

  public select_signed:Signed=null;
  public model_Select:string='Signed';
  public properti_model_Select:string="name";

  public form:FormGroup;

  constructor(private navParams:NavParams,private modalController: ModalController,private utils:UtilsService,
    private api:ApiService,private fb: FormBuilder,private auth:AuthenticationService) {
      this.wasteRecord=this.navParams.get('obj');
      this.form=this.fb.group({
        person:['',[Validators.required]],
        date:['',[Validators.required]],
        amount:['',[Validators.required,Validators.pattern("^\\d{1,9}(\\.\\d{1,10})?$")]]   
      });
     }

  ngOnInit() {
    if(this.wasteRecord!=null){
      this.title="Editar Registro Residuos";
      this.form.get('person').setValue(this.wasteRecord.person);
      this.form.get('date').setValue(this.wasteRecord.date);
      this.form.get('amount').setValue(this.wasteRecord.amount);
      this.select_signed=this.wasteRecord.signed;
    }else{
      this.title="Añadir Registro Residuos";
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
      let date_format:string=this.form.get('date').value;
      let date=date_format.slice(0,10);
      if(this.wasteRecord!=null){
        this.wasteRecord.signed=this.select_signed;
        this.wasteRecord.date=date;
        this.wasteRecord.person=this.form.get('person').value;
        this.wasteRecord.amount=this.form.get('amount').value;
        try {
          let updatedRecord:WasteRecord=await this.api.updateRecordOfModel('WasteRecord',this.wasteRecord);
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
        let toadd:WasteRecord={
          amount:this.form.get('amount').value,
          date:date,
          person:this.form.get('person').value,
          signed:this.select_signed,
          user:this.auth.userConfigSaved.user,
        }
        
        try {
          let added=await this.api.addRecordOfModel('WasteRecord',toadd);
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
      this.utils.showSnackBar("FIRMADO no puede estar sin seleccionar","OK");
    }
  }

  public async deleteRecord(){
    if(this.wasteRecord!=null){
      let acep=await this.utils.presentAlertConfirm('','Alerta','¿Seguro que desea borrar el registro?','CANCELAR','ACEPTAR');
      if(acep){
        await this.utils.presentLoading();
        try {
          let deleted:boolean= await this.api.deleteRecordOfModel("WasteRecord",this.wasteRecord.id);
          if(deleted){
            await this.utils.dismissLoading();
            this.utils.presentToast("Eliminado correctamente","success",2000);
            this.modalController.dismiss(true);
          }else{
            await this.utils.dismissLoading();
            this.utils.showSnackBar("No se ha podido eliminar","OK");
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

}
