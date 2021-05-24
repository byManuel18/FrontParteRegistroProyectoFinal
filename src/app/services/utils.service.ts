import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  
  private isLoading:boolean=false;

  constructor(private loadingController: LoadingController,public alertController: AlertController,private MenuControl:MenuController,
    private snackbar: MatSnackBar,public toastController: ToastController) { }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create().then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismissLoading() {
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadingController.dismiss();
    }
    return null;
  }

  ControllerMenu(enable:boolean,open:boolean){
    this.MenuControl.enable(enable).then((e)=>{
      if(open){
        this.MenuControl.open();
      }else{
        this.MenuControl.close();
      }
    })  
  }

  showSnackBar(cadena:string,button:string){
    this.snackbar.open(cadena,button);
  }

  async presentAlertConfirm(css: string, header: string, message: string,cancelbutton:string,aceptButton:string): Promise<boolean> {
  
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        cssClass: css,
        header: header,
        message: message,
        buttons: [
          {
            text: cancelbutton,
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              resolve(false)
            }
          }, {
            text: aceptButton,
            handler: () => {
              resolve(true);
            }
          }
        ]
      });
      await alert.present();
    });

  }

  async presentToast(message:string,color:string,duration:number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color:color,
    });
    toast.present();
  }

}
