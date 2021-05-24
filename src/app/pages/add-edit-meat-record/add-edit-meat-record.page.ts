import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { MeatRecord } from 'src/app/models/MeatRecord';
import { SelectSearch } from 'src/app/models/SelectSearch';
import { Signed } from 'src/app/models/Signed';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-edit-meat-record',
  templateUrl: './add-edit-meat-record.page.html',
  styleUrls: ['./add-edit-meat-record.page.scss'],
})
export class AddEditMeatRecordPage implements OnInit {
  public title:string="";
  public meatRecord:MeatRecord;
  public count:number=0;

  public select_signed:Signed=null;
  public model_Select:string='Signed';
  public properti_model_Select:string="name";

  public form:FormGroup;
  constructor(private navParams:NavParams,private modalController: ModalController,private utils:UtilsService,
    private api:ApiService,private fb: FormBuilder,private auth:AuthenticationService) {
    this.meatRecord=this.navParams.get('obj');
    this.form=this.fb.group({
      product:['',[Validators.required]],
      supplier:['',[Validators.required]],
      lote:['',[Validators.required]],
      date:['',[Validators.required]],
    });
   }

  ngOnInit() {
    if(this.meatRecord!=null){
      //Actualiza
      this.form.get('product').setValue(this.meatRecord.product);
      this.form.get('supplier').setValue(this.meatRecord.supplier);
      this.form.get('lote').setValue(this.meatRecord.lote);
      this.form.get('date').setValue(this.meatRecord.date);
      this.select_signed=this.meatRecord.signed;
      this.title="Edit Meat Record";
    }else{
      this.title="Add Meat Record";
    }
  }

  public getOut(){
    let refresh:boolean=false;
    if(this.count>0){
      refresh=true;
    }
    this.modalController.dismiss(refresh);
  }

  public async deleteRecord(){
    if(this.meatRecord!=null){
      let acep=await this.utils.presentAlertConfirm('','Alerta','¿Seguro que desea borrar el registro?','CANCELAR','ACEPTAR');
      if(acep){
        await this.utils.presentLoading();
        try {
          let deleted:boolean= await this.api.deleteRecordOfModel("meatrecord",this.meatRecord.id);
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
  
  public async sendForm(){
    if(this.select_signed!=null){
      await this.utils.presentLoading();
      let date_format:string=this.form.get('date').value;
      let date=date_format.slice(0,10);
      if(this.meatRecord!=null){
        this.meatRecord.date=date;
        this.meatRecord.lote=this.form.get('lote').value;
        this.meatRecord.product=this.form.get('product').value;
        this.meatRecord.signed=this.select_signed;
        this.meatRecord.supplier=this.form.get('supplier').value;
        try {
          let updatedRecord:MeatRecord=await this.api.updateRecordOfModel('MeatRecord',this.meatRecord);
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
        let toaddRecord:MeatRecord={
          date:date,
          lote:this.form.get('lote').value,
          product:this.form.get('product').value,
          signed:this.select_signed,
          supplier:this.form.get('supplier').value,
          user:this.auth.userConfigSaved.user,
        }
        try {
          let added=await this.api.addRecordOfModel('MeatRecord',toaddRecord);
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
      this.utils.showSnackBar("Firmado no puede estar sin seleccionar","OK");
    }
  }
  
  public getSelect($event){
    this.select_signed=$event;
  }

}
