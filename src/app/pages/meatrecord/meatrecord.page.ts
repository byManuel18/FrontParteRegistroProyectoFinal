import { Component, OnInit } from '@angular/core';
import { MeatRecord } from 'src/app/models/MeatRecord';
import { SelectSearch } from 'src/app/models/SelectSearch';
import { TableColumn } from 'src/app/models/table_colums';
import { PdfService } from 'src/app/services/pdf.service';
import { AddEditMeatRecordPage } from '../add-edit-meat-record/add-edit-meat-record.page';

@Component({
  selector: 'app-meatrecord',
  templateUrl: './meatrecord.page.html',
  styleUrls: ['./meatrecord.page.scss'],
})
export class MeatrecordPage implements OnInit {

  public searachSelect:SelectSearch[]=[{id:"no",name:"Disabled"},{id:"product",name:"Product"},
  {id:"lote",name:"Lote"},{id:"date",name:"Date"},{id:"supplier",name:"Supplier"}];

  public columns:TableColumn<MeatRecord>[]=[{label:"Producto",property:"product",type:"text",visible:true},
  {label:"Distribuidor",property:"supplier",type:"text",visible:true},
  {label:"Lote",property:"lote",type:"text",visible:true},
  {label:"Fecha",property:"date",type:"date",visible:true}
  ];
  public model:string="MeatRecord";
  public ref:any=AddEditMeatRecordPage;
  private data:MeatRecord[]=[];
  constructor(private pdf:PdfService) { }

  ngOnInit() {
  }


  public getDates(MeatRecords:MeatRecord[]){
    this.data=MeatRecords;
  }

  public async doPDF(){
    
    let body:any[]=[];
    body.push(["PRODUCTO","DISTRIBUIDOR","FECHA","FIRMADO"]);
    this.data.forEach((element)=>{
      body.push([element.product,element.supplier,element.date,element.signed.name]);
    });
    await this.pdf.generatePdf(body,"Registro Carne");
  }

}
