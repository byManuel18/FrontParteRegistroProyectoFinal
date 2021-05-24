import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/folder/Inbox', icon: '../assets/iconos-images/house.svg' },
    { title: 'Registro Carne', url: '/meatrecord', icon: '../assets/iconos-images/meat.svg' },
    { title: 'Trazabilidad Carne', url: '/traceabilityofmeat', icon: '../assets/iconos-images/archivo.svg' },
    { title: 'Trazabilidad Materia Prima', url: '/raw-material-record', icon: '../assets/iconos-images/raw.svg' },
    { title: 'Producción', url: '/production', icon: '../assets/iconos-images/produccion.svg' },
    { title: 'Registro Agua', url: '/watter-record', icon: '../assets/iconos-images/agua.svg' },
    { title: 'Registro Residuos', url: '/waste-record', icon: '../assets/iconos-images/dump.svg' },
    { title: 'Registro Temperaturas', url: '/temperaturerecord', icon: '../assets/iconos-images/temperatura.svg' }
  ];
  
  loged:boolean=true;
  constructor(private platform: Platform,private auth:AuthenticationService,private Utils:UtilsService) {
    this.inicializeApp();
  }

  async inicializeApp(){
    this.platform.ready().then(async()=>{
      await this.auth.init();
      this.loged=await this.auth.isLogged();
      if(this.loged){
        this.Utils.ControllerMenu(true,true);
      }else{
        this.Utils.ControllerMenu(false,false);
      }
    });
    
  }

  Desconectarse(){
    this.auth.logout();
  }

}
