import { Component, OnInit } from '@angular/core';
import { Production } from 'src/app/models/Production';
import { SelectSearch } from 'src/app/models/SelectSearch';
import { TableColumn } from 'src/app/models/table_colums';
import { PdfService } from 'src/app/services/pdf.service';
import { AddEditProduccionPage } from '../add-edit-produccion/add-edit-produccion.page';

@Component({
  selector: 'app-production',
  templateUrl: './production.page.html',
  styleUrls: ['./production.page.scss'],
})
export class ProductionPage implements OnInit {

  public searachSelect:SelectSearch[]=[{id:"no",name:"Deshabilitado"},{id:"product",name:"Producto"},
  {id:"date",name:"Fecha"}]; 

  public columns:TableColumn<Production>[]=[{label:"Producto",property:"product",type:"text",visible:true},
  {label:"Cantidad",property:"amount",type:"text",visible:true},
  {label:"Firmado",property:"signed.name",type:"text",visible:true},
  {label:"Fecha",property:"date",type:"date",visible:true}
  ];

  public model:string="Production";  
  public ref:any=AddEditProduccionPage;

  public css_modal:string[]=["modal-production"];
  private data:Production[]=[];
  
  constructor(private pdf:PdfService) { }

  ngOnInit() {
  }

  public getDates(productiond:Production[]){
    this.data=productiond;
  }

  public async doPDF(){
    
    let body:any[]=[];
    body.push(["PRODUCTO","CANTIDAD","CARNES","MATERIA PRIMA","FECHA","FIRMADO"]);
    this.data.forEach((element)=>{
      let lotescarne:string="";
      let lotesmateriaprima:string="";
      element.listTraceabilityOfMeat.forEach((v)=>{
        lotescarne+=v.meatrecord.lote;
        lotescarne+="/";
      })
      element.listRawMaterialRecord.forEach((v)=>{
        lotesmateriaprima+=v.lote;
        lotesmateriaprima+="/"
      })
      body.push([element.product,element.amount,lotescarne,lotesmateriaprima,element.date,element.signed.name]);
    });
    await this.pdf.generatePdf(body,"Registro Producción");
  }

}
