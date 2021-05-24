import { Component, OnInit } from '@angular/core';
import { MeatRecord } from 'src/app/models/MeatRecord';
import { SelectSearch } from 'src/app/models/SelectSearch';
import { TableColumn } from 'src/app/models/table_colums';
import { AddEditMeatRecordPage } from '../add-edit-meat-record/add-edit-meat-record.page';

@Component({
  selector: 'app-meatrecord',
  templateUrl: './meatrecord.page.html',
  styleUrls: ['./meatrecord.page.scss'],
})
export class MeatrecordPage implements OnInit {

  public searachSelect:SelectSearch[]=[{id:"no",name:"Disabled"},{id:"product",name:"Product"},
  {id:"lote",name:"Lote"},{id:"date",name:"Date"},{id:"supplier",name:"Supplier"}];

  public columns:TableColumn<MeatRecord>[]=[{label:"Product",property:"product",type:"text",visible:true},
  {label:"Supplier",property:"supplier",type:"text",visible:true},
  {label:"Lote",property:"lote",type:"text",visible:true},
  {label:"Date",property:"date",type:"date",visible:true}
  ];
  public model:string="MeatRecord";
  public ref:any=AddEditMeatRecordPage;
  
  constructor() { }

  ngOnInit() {
  }

}
