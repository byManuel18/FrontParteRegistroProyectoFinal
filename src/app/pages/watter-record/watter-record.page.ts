import { Component, OnInit } from '@angular/core';
import { SelectSearch } from 'src/app/models/SelectSearch';
import { TableColumn } from 'src/app/models/table_colums';
import { WatterRecord } from 'src/app/models/WatterRecord';
import { AddEditWatterRecordPage } from '../add-edit-watter-record/add-edit-watter-record.page';

@Component({
  selector: 'app-watter-record',
  templateUrl: './watter-record.page.html',
  styleUrls: ['./watter-record.page.scss'],
})
export class WatterRecordPage implements OnInit {
  public searachSelect:SelectSearch[]=[{id:"no",name:"Deshabilidato"},{id:"samplingpoint",name:"Punto muestreo"},
  {id:"date",name:"Fecha"}];

  public columns:TableColumn<WatterRecord>[]=[{label:"Punto muestreo",property:"samplingpoint",type:"text",visible:true},
  {label:"Estado",property:"condition.name",type:"text",visible:true},
  {label:"Control Organoleptico",property:"organoleptic_control",type:"text",visible:true},
  {label:"Firmado",property:"signed.name",type:"text",visible:true},
  {label:"Fecha",property:"date",type:"date",visible:true}
  ];
  
  public model:string="WatterRecord";
  public ref:any=AddEditWatterRecordPage;
  constructor() { }

  ngOnInit() {
  }

}
