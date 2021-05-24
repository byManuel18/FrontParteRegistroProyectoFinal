import { Component, OnInit } from '@angular/core';
import { SelectSearch } from 'src/app/models/SelectSearch';
import { TableColumn } from 'src/app/models/table_colums';
import { WasteRecord } from 'src/app/models/WasteRecord';
import { AddEditWasteRecordPage } from '../add-edit-waste-record/add-edit-waste-record.page';

@Component({
  selector: 'app-waste-record',
  templateUrl: './waste-record.page.html',
  styleUrls: ['./waste-record.page.scss'],
})
export class WasteRecordPage implements OnInit {
   
  public searachSelect:SelectSearch[]=[{id:"no",name:"Deshabilitado"},{id:"person",name:"Persona"},
  {id:"date",name:"Fecha"}];

  public columns:TableColumn<WasteRecord>[]=[{label:"Persona",property:"person",type:"text",visible:true},
  {label:"Cantidad (Kg)",property:"amount",type:"text",visible:true},
  {label:"Firmado",property:"signed.name",type:"text",visible:true},
  {label:"Fecha",property:"date",type:"date",visible:true}
  ];

  public model:string="WasteRecord";
  public ref:any=AddEditWasteRecordPage;
  constructor() { }

  ngOnInit() {
  }

}
