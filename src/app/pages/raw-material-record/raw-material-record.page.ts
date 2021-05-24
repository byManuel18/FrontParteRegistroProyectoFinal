import { Component, OnInit } from '@angular/core';
import { RawMaterialRecord } from 'src/app/models/RawMaterialRecord';
import { SelectSearch } from 'src/app/models/SelectSearch';
import { TableColumn } from 'src/app/models/table_colums';
import { AddEditRawMaterialRecordPage } from '../add-edit-raw-material-record/add-edit-raw-material-record.page';

@Component({
  selector: 'app-raw-material-record',
  templateUrl: './raw-material-record.page.html',
  styleUrls: ['./raw-material-record.page.scss'],
})
export class RawMaterialRecordPage implements OnInit {

  public searachSelect:SelectSearch[]=[{id:"no",name:"Deshabilitado"},{id:"commodity",name:"Producto"},
  {id:"lote",name:"Lote"},{id:"supplier",name:"Distribuidor"},{id:"arrivaldate",name:"Fecha Llegada"},{id:"startdate",name:"Fecha Comienzo"},
  {id:"enddate",name:"Fecha Fin"}]; 

  public columns:TableColumn<RawMaterialRecord>[]=[{label:"Producto",property:"commodity",type:"text",visible:true},
  {label:"Lote",property:"lote",type:"text",visible:true},
  {label:"Distribuidor",property:"supplier",type:"text",visible:true},
  {label:"Firmado",property:"signed.name",type:"text",visible:true},
  {label:"Fecha Llegada",property:"arrival_date",type:"date",visible:true},
  {label:"Fecha Comienzo",property:"start_date",type:"date",visible:true},
  {label:"Fecha Fin",property:"end_date",type:"date",visible:true},
  ];

  public model:string="RawMaterialRecord";
  public ref:any=AddEditRawMaterialRecordPage;
  
  constructor() { }

  ngOnInit() {
  }

}
