import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { ApiService } from '../services/api.service';
import { AuthenticationService } from '../services/authentication.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss',
  '../../../node_modules/quill/dist/quill.snow.css'],
  encapsulation:ViewEncapsulation.None
})
export class FolderPage implements OnInit {
  defaultImage:string="src/assets/noimage.png";
  image:string="";

  typePassWord:string="Password";
  iconPassW:string="eye-outline";
  typeClassIconPass:string="hide-option";

  formModulText = new FormControl();
  formemail:FormGroup;
  formeditUser:FormGroup;
  constructor(private fb:FormBuilder,private auth:AuthenticationService,private utils:UtilsService,
    private api:ApiService) {
    this.formemail=this.fb.group({
      asunto:['',[Validators.required]]
    });
    this.formeditUser=this.fb.group({
      file:[''],
      email:['',[Validators.required,Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")]],
      nombre:['',[Validators.required]],
      telef:['',[Validators.required,Validators.pattern("^\\(?(\\d{3})\\)?[-]?(\\d{3})[-]?(\\d{3})$")]],
      adress:['',[Validators.required]],
      contra:['',[Validators.pattern("^(?=.*\\d)(?=.*[\\u0021-\\u002b\\u003c-\\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{6,16}$")]]
    });
   }

  async ngOnInit() {
   if(this.auth.userConfigSaved.user.avatar!=null&&this.auth.userConfigSaved.user.avatar!=""){
    this.image=this.auth.userConfigSaved.user.avatar;
   }else{
     this.image=this.defaultImage;
   }
   this.formeditUser.get('email').setValue(this.auth.userConfigSaved.user.gmail);
   this.formeditUser.get('nombre').setValue(this.auth.userConfigSaved.user.name);
   this.formeditUser.get('telef').setValue(this.auth.userConfigSaved.user.phone);
   this.formeditUser.get('adress').setValue(this.auth.userConfigSaved.user.address);
  }

  public async sendEmail(){
    await this.utils.presentLoading();
    await emailjs.send(environment.serviceid,environment.templateid,{email:this.auth.userConfigSaved.user.gmail,asunto:this.formemail.get('asunto').value,
                mensaje:this.formModulText.value},environment.userid).then((e:EmailJSResponseStatus)=>{
      console.log(e);
      this.utils.presentToast("Email enviado","success",2000);
     }).catch((err)=>{
     console.log(err);
     this.utils.presentToast("No se ha podido mandar el email","danger",2000);
     })
     this.formModulText.reset();
     this.formemail.reset();
    await this.utils.dismissLoading();
  }

  public clearImage(){
    this.image=this.defaultImage;
  }

  public async selectAvatar(){
    var file=this.formeditUser.get("file").value._files[0];
    let varia=new FileReader();
    await varia.readAsDataURL(file);
    varia.onloadend=(e:any)=>{
      this.image=e.currentTarget.result;
    }
  }

  public changePasswordType(){
    if(this.iconPassW==="eye-outline"){
      this.iconPassW="eye-off-outline";
      this.typePassWord="text";
      this.typeClassIconPass="show-option";
    }else{
      this.iconPassW="eye-outline";
      this.typePassWord="Password";
      this.typeClassIconPass="hide-option";
    }
  }

  public async sendForm(){
    await this.utils.presentLoading();
    let im:string="";
    let edited:boolean=false;
    let password:string="null";
    let constantestring:string=this.formeditUser.get("contra").value;
    if(this.image!=this.defaultImage){
      im=this.image;
    }
    
    if(constantestring.length>=6){
      password=this.formeditUser.get("contra").value;
    }

    let editUser:User=this.auth.userConfigSaved.user;
    editUser.address=this.formeditUser.get('adress').value;
    editUser.avatar=this.image;
    editUser.gmail=this.formeditUser.get('email').value;
    editUser.name=this.formeditUser.get('nombre').value;
    editUser.phone=this.formeditUser.get('telef').value;

    try {
      edited =await this.api.updateUser(editUser,password);
      if(edited){
        let updateduser:User=await this.api.getUserByUid(editUser.uid);
        this.auth.userConfigSaved.user=updateduser;
        await this.auth.saveStorage();
      }
    } catch (error) {
      console.log(error);
      this.utils.showSnackBar("Se ha producifo un error. Pruebe más tarde o pongase en contacto mediante un email.","OK");
    }
    await this.utils.dismissLoading();
    if(edited){
      this.utils.presentToast("Usuario editado","success",2000);
    }else{
      this.utils.presentToast("No se ha podido editar","danger",2000);
    }
  }


}
