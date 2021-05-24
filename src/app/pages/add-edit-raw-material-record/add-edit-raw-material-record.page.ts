import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { RawMaterialRecord } from 'src/app/models/RawMaterialRecord';
import { Signed } from 'src/app/models/Signed';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-edit-raw-material-record',
  templateUrl: './add-edit-raw-material-record.page.html',
  styleUrls: ['./add-edit-raw-material-record.page.scss'],
})
export class AddEditRawMaterialRecordPage implements OnInit {
 
  public title:string="";
  public rawMaterialRecord:RawMaterialRecord;
  public count:number=0;

  public select_signed:Signed=null;
  public model_Select:string='Signed';
  public properti_model_Select:string="name";

  public form:FormGroup;
  constructor(private navParams:NavParams,private modalController: ModalController,private utils:UtilsService,
    private api:ApiService,private fb: FormBuilder,private auth:AuthenticationService) { 
      this.rawMaterialRecord=this.navParams.get('obj');
      this.form=this.fb.group({
        commodity:['',[Validators.required]],
        supplier:['',[Validators.required]],
        lote:['',[Validators.required]],
        arrival_date:['',[Validators.required]],
        start_date:['',[Validators.required]],
        end_date:['',[Validators.required]],
      });
    }

  ngOnInit() {

    if(this.rawMaterialRecord!=null){
      this.title="Añadir Registro Materia Prima";
      this.select_signed=this.rawMaterialRecord.signed;
      this.form.get('lote').setValue(this.rawMaterialRecord.lote);
      this.form.get('supplier').setValue(this.rawMaterialRecord.supplier);
      this.form.get('commodity').setValue(this.rawMaterialRecord.commodity);
      this.form.get('arrival_date').setValue(this.rawMaterialRecord.arrival_date);
      this.form.get('start_date').setValue(this.rawMaterialRecord.start_date);
      this.form.get('end_date').setValue(this.rawMaterialRecord.end_date);
    }else{
      this.title="Editar Registro Materia Prima";
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
    if(this.rawMaterialRecord!=null){
      let acep=await this.utils.presentAlertConfirm('','Alerta','¿Seguro que desea borrar el registro?','CANCELAR','ACEPTAR');
      if(acep){
        await this.utils.presentLoading();
        try {
          let deleted:boolean= await this.api.deleteRecordOfModel("rawmaterialrecord",this.rawMaterialRecord.id);
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
      let formatarrivaldate:string=this.form.get('arrival_date').value;
      let formatstartdate:string=this.form.get('start_date').value;
      let formatenddate:string=this.form.get('end_date').value;
      if(this.rawMaterialRecord!=null){
        this.rawMaterialRecord.signed=this.select_signed;
        this.rawMaterialRecord.arrival_date=formatarrivaldate.slice(0,10);
        this.rawMaterialRecord.start_date=formatstartdate.slice(0.10);
        this.rawMaterialRecord.end_date=formatenddate.slice(0,10);
        this.rawMaterialRecord.commodity=this.form.get('commodity').value;
        this.rawMaterialRecord.lote=this.form.get('lote').value;
        this.rawMaterialRecord.supplier=this.form.get('supplier').value;
        try {
          let updatedRecord:RawMaterialRecord=await this.api.updateRecordOfModel('RawMaterialRecord',this.rawMaterialRecord);
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
        let toaddRecord:RawMaterialRecord={
          supplier:this.form.get('supplier').value,
          arrival_date:formatarrivaldate.slice(0,10),
          commodity:this.form.get('commodity').value,
          end_date:formatenddate.slice(0,10),
          start_date:formatstartdate.slice(0,10),
          signed:this.select_signed,
          lote:this.form.get('lote').value,
          user:this.auth.userConfigSaved.user
        }

        try {
          let added=await this.api.addRecordOfModel('RawMaterialRecord',toaddRecord);
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
