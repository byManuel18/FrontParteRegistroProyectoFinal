import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditRawMaterialRecordPageRoutingModule } from './add-edit-raw-material-record-routing.module';

import { AddEditRawMaterialRecordPage } from './add-edit-raw-material-record.page';
import { SelectsModule } from 'src/app/components/selects/selects.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddEditRawMaterialRecordPageRoutingModule,
    SelectsModule
  ],
  declarations: [AddEditRawMaterialRecordPage]
})
export class AddEditRawMaterialRecordPageModule {}
