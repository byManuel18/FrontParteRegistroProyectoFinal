import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  
  private pdfMake: any;

  constructor() { }


  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }
  
  async generatePdf(body:any,title:string) {
    await this.loadPdfMaker();
    const def = { content: [{text:title},
      {text:" "},
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: '*',
  
          body: body
        }
      }
    ] };
    try {
      this.pdfMake.createPdf(def).open();
    } catch (error) {
      this.pdfMake.createPdf(def).download();
    }
    
  }
}
