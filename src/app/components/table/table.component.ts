import { AfterViewInit, Component, ComponentRef, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TableColumn } from 'src/app/models/table_colums';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SelectSearch } from 'src/app/models/SelectSearch';
import { IonSearchbar, IonSelect, ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit,AfterViewInit {

  @Input() columns: TableColumn<any>[];
  @Input() model: string;
  @Input() searachSelect:SelectSearch[];
  @Input() ref:any=null;
  @Input() css_modal:string[]=[];
  @Input() eventChargeFristTime:boolean=true;
  @Input() ionrefreshactivate:boolean=true;
  @Input() tabletitle:string="";
  @Input() tooltiptitle:string="Presiona para editar";

  private fristCharge:boolean=false;

  public data: any[]=[];
  public dataSource: MatTableDataSource<any> | null;

  public length = 0;
  public auxpage=0;
  
  public order:string="ASCENDING";
  public disableSearch:boolean=true;
  public typesearch:string="Disabled";
  public dateSearch:boolean=false;

  public params:any={
    order:this.order,
  };

  public button_order:string="caret-up-outline";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('IonSelectTable') ionSelect:ElementRef<IonSelect>;
  @ViewChild('IonSearch') ionSearch:ElementRef<IonSearchbar>;
  @ViewChild('IonDate') ionDate:ElementRef<IonSearchbar>;
  
  @Output() messageEvent = new EventEmitter<any>();
  @Output() messageEventArrayDates = new EventEmitter<any[]>();
 
  public pageSize = 10;
  public pageSizeOptions: number[] = [5, 10, 20, 50];

  private optionDisabled:SelectSearch=null;

  constructor(private ApiService:ApiService,private auth:AuthenticationService,private utils:UtilsService,public modalController: ModalController) { }
  
  ngAfterViewInit(): void {
    let KeepGoing:boolean=true;
    this.searachSelect.forEach((v,i)=>{
      if(KeepGoing){
        if(v.id.toLowerCase()=="no"){
          this.ionSelect.nativeElement.value=v;
          this.optionDisabled=v;
          KeepGoing=false;
        }
      }
    });

    this.getData();
    
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    
  }

  async getData($event=null){
    if($event==null){
      if(this.eventChargeFristTime||this.fristCharge){
        await this.utils.presentLoading();
      }
    }
    try {
      this.length=await this.ApiService.getPagesByModel(this.auth.userConfigSaved.user.uid,this.model,this.pageSize,this.params);
      this.data=await this.ApiService.getAllByModel(this.auth.userConfigSaved.user.uid,this.model,this.pageSize,this.auxpage,this.params);
    } catch (error) {
      
    }
    this.dataSource = new MatTableDataSource();
    this.dataSource.data=this.data;
    this.messageEventArrayDates.emit(this.data);

    if($event==null){
      if(this.eventChargeFristTime||this.fristCharge){
        await this.utils.dismissLoading();
      }
      this.fristCharge=true;
    }else{
      $event.target.complete();
    }
    if(this.auxpage>0&&(this.data==null||this.data.length==0)){
      this.paginator.previousPage();
    }
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  damePropiedades= (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  )

  async goToUpdateOrAdd(row:any){
    if(this.ref!=null){
      const modal=await this.modalController.create({
        component:this.ref,
        componentProps:{
          obj:row
        },
        backdropDismiss:false,
        cssClass:this.css_modal
      });
      await modal.present();
      let data=await modal.onWillDismiss();
      if(data.data){
        if(data.data==true){
          this.getData();
        }
      }
    }else{
      this.messageEvent.emit(row);
    }
    
  }
 
  async ChangeValue($event){
    if($event.detail.value.id!=undefined){
      let id:string=$event.detail.value.id;
      if(id.toLowerCase()!="no"){
        this.disableSearch=false;
      }else{
        this.dateSearch=false;
        this.disableSearch=true;
        if( this.ionSearch!=undefined){
          this.ionSearch.nativeElement.value="";
        }
      }
      this.params={
        order:this.order,
      };
      
      let rex=new RegExp('date\\b');
        
      if(rex.test(id.toLowerCase())){
        this.dateSearch=true;
      }else{
        this.dateSearch=false;
        this.typesearch=$event.detail.value.name;
      }
      if(this.paginator.getNumberOfPages()>1){
        this.paginator.firstPage();
      }else{
        await this.getData();
      }
    
    }  
  }

  async onChangeSearchBar($event){
    let caseSearch:string=$event.detail.value;
    if(this.ionSelect.nativeElement.value!=undefined){
      let cadena:SelectSearch=this.ionSelect.nativeElement.value;
      this.params={
        [cadena.id]:caseSearch,
        order:this.order,
      }
    }else{
      this.params={
        order:this.order,
      };
    }
    await this.getData();

    this.ionSearch.nativeElement.setFocus();
  }

  async changePaginator($event){
    if($event.pageSize!=this.pageSize){
      this.paginator.firstPage();
      this.pageSize=$event.pageSize;
      this.auxpage=0;
    }else{
      this.auxpage=$event.pageIndex;
    }
    await this.getData();
  }

  public async ClickButtoOrder(){
    if(this.button_order==="caret-down-outline"){
      this.button_order="caret-up-outline";
      this.order="ASCENDING";
    }else{
      this.button_order="caret-down-outline";
      this.order="DESCENDING";
    }
    this.params={
      order:this.order,
    };
    console.log(this.params);
    
    await this.getData();
  }

  public async changeDate($event){
    let date:string=$event.detail.value.slice(0,10);
    console.log(date);
    let paramName:SelectSearch=this.ionSelect.nativeElement.value;
    this.params={
      order:this.order,
      [paramName.id]:date
    }
    await this.getData();
  }

  async Refres($event=null){
    this.length = 0;
    this.pageSize = 10;
    this.order="ASCENDING";
    this.typesearch="Disabled";
    this.disableSearch=true;
    this.auxpage=0;
    this.button_order="caret-up-outline";
    this.params={
      order:this.order,
    }
    this.ionSearch.nativeElement.value="";
    this.ionSelect.nativeElement.value=this.optionDisabled;
    this.dateSearch=false;
    await this.getData($event);
  }

}
