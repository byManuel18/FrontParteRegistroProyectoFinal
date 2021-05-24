import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-selects',
  templateUrl: './selects.component.html',
  styleUrls: ['./selects.component.scss'],
})
export class SelectsComponent implements OnInit, AfterViewInit{

  arrayData:any[]=[];
  @Input() model:string="";
  @Input() properti:string="";
  @Input() selected:any=null;
  @Output() messageEvent = new EventEmitter<any>();
  @ViewChild('IonSelect') ionSelect:ElementRef<IonSelect>;
  constructor(private ApiS:ApiService,private Auth:AuthenticationService) { }
  
  ngOnInit() {
   
   
  }

  ngAfterViewInit(): void {
   this.Carga();
  }

  async Carga(){
    try {
      if(this.model.toLowerCase()=="appliance"){
        this.arrayData=await this.ApiS.getAnyForSelect(this.model,this.Auth.userConfigSaved.user.uid);
      }else{
        this.arrayData=await this.ApiS.getAnyForSelect(this.model);
      }
      
      if(this.selected!=null){
        let keepGoing:boolean=true;
        this.arrayData.forEach((value,index)=>{   
          if(keepGoing){
            if(Object.getOwnPropertyNames(value).toString() == Object.getOwnPropertyNames(this.selected).toString()){
             if(value.id==this.selected.id){
              this.ionSelect.nativeElement.value=value;
              keepGoing=false;
             } 
            }
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  ChangeValue($event){
    let newValue:any=$event.detail.value;
    this.messageEvent.emit(newValue);
  }

  damePropiedades= (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  )

}
