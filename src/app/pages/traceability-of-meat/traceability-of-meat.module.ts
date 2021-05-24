import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TraceabilityOfMeatPageRoutingModule } from './traceability-of-meat-routing.module';

import { TraceabilityOfMeatPage } from './traceability-of-meat.page';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TraceabilityOfMeatPageRoutingModule,
    TableModule
  ],
  declarations: [TraceabilityOfMeatPage]
})
export class TraceabilityOfMeatPageModule {}
