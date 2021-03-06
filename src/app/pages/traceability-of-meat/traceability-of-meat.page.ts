import { Component, OnInit } from '@angular/core';
import { SelectSearch } from 'src/app/models/SelectSearch';
import { TableColumn } from 'src/app/models/table_colums';
import { TraceabilityOfMeat } from 'src/app/models/TraceabilityOfMeat';
import { PdfService } from 'src/app/services/pdf.service';
import { AddEditTraceabilityOfMeatPage } from '../add-edit-traceability-of-meat/add-edit-traceability-of-meat.page';

@Component({
  selector: 'app-traceability-of-meat',
  templateUrl: './traceability-of-meat.page.html',
  styleUrls: ['./traceability-of-meat.page.scss'],
})
export class TraceabilityOfMeatPage implements OnInit {

  public searachSelect:SelectSearch[]=[{id:"no",name:"Deshabilitado"},
  {id:"arrivaldate",name:"Fecha Llegada"},{id:"startdate",name:"Fecha Comienzo"},
  {id:"enddate",name:"Fecha Fin"}];

  public columns:TableColumn<TraceabilityOfMeatPage>[]=[{label:"Producto",property:"meatrecord.product",type:"text",visible:true},
  {label:"Lote",property:"meatrecord.lote",type:"text",visible:true},
  {label:"Distribuidor",property:"meatrecord.supplier",type:"text",visible:true},
  {label:"Firmado",property:"signed.name",type:"text",visible:true},
  {label:"Fecha Llegada",property:"meatrecord.date",type:"date",visible:true},
  {label:"Fecha Comienzo",property:"startdate",type:"date",visible:true},
  {label:"Fecha Fin",property:"enddate",type:"date",visible:true},
  ];
  
  public model:string="TraceabilityOfMeat";
  public ref:any=AddEditTraceabilityOfMeatPage;
  public css_modal:string[]=["modal-trazmeat"];
  private data:TraceabilityOfMeat[]=[];
  constructor(private pdf:PdfService) { }

  ngOnInit() {
  }

  public getDates(trazmeat:TraceabilityOfMeat[]){
    this.data=trazmeat;
  }

  public async doPDF(){
    
    let body:any[]=[];
    body.push(["PRODUCTO","DISTRIBUIDOR","LOTE","FECHA LLEGADA","FECHA INICIO","FECHA FIN","FIRMADO"]);
    this.data.forEach((element)=>{
      body.push([element.meatrecord.product,element.meatrecord.supplier,element.meatrecord.lote,element.arrivaldate,element.startdate,element.enddate,element.signed.name]);
    });
    await this.pdf.generatePdf(body,"Registro Trazabilidad Carne");
  }

}
