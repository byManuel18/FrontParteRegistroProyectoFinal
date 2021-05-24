import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private mantenerIniciado:boolean=false;
  public form: FormGroup;
  constructor(private authS:AuthenticationService, private router:Router,private formBuilder: FormBuilder,private snackbar: MatSnackBar,
    private utils:UtilsService) { 
    this.form=this.formBuilder.group({
      email:['',[Validators.required,Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")]],
      passw:['',[Validators.required,Validators.pattern("^(?=.*\\d)(?=.*[\\u0021-\\u002b\\u003c-\\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{6,16}$")]]
    });
  }

  async ngOnInit() {
    try {
      let log:boolean=await this.authS.isLogged();
      if(log){
        this.utils.ControllerMenu(true,true);
        this.router.navigate(['folder/Inbox']);
      }else{
        this.utils.ControllerMenu(false,false); 
      }
    } catch (error) {
      console.log(error);
    }
  }

  async sendForm(){
    await this.utils.presentLoading();
    
    try {
      let result:boolean=await this.authS
      .login(this.form.get('email').value,this.form.get('passw').value,this.mantenerIniciado);
      if(result){
        await this.utils.dismissLoading();
        this.form.reset();
        this.utils.ControllerMenu(true,true);
        this.router.navigate(['folder/Inbox']);
      }else{
        console.log("Mal");
        await this.utils.dismissLoading();
      }
    } catch (error) {
      let codeError:string=error.code;
      let message:string='';

      switch(codeError){
        case 'auth/invalid-email':
            message="Email no válido";
          break;
        case 'auth/wrong-password':
            message="La contraseña no coincide con el usuario";
          break;
        case 'auth/user-not-found':
            message="Usuario no registrado";
          break;
        case 'auth/user-disabled':
            message="Usuario deshabilitado";
          break;
        default:
          message=codeError;
      }
      await this.utils.dismissLoading();
      this.snackbar.open(message, "OK");
      
    }
  }


  ChangeCheck($event){
    this.mantenerIniciado=$event.detail.checked;
  }

}
