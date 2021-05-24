import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditTraceabilityOfMeatPageRoutingModule } from './add-edit-traceability-of-meat-routing.module';

import { AddEditTraceabilityOfMeatPage } from './add-edit-traceability-of-meat.page';
import { SelectsModule } from 'src/app/components/selects/selects.module';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddEditTraceabilityOfMeatPageRoutingModule,
    SelectsModule,
    TableModule
  ],
  declarations: [AddEditTraceabilityOfMeatPage]
})
export class AddEditTraceabilityOfMeatPageModule {}
