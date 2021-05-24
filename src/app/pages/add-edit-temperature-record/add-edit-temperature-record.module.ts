import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditTemperatureRecordPageRoutingModule } from './add-edit-temperature-record-routing.module';

import { AddEditTemperatureRecordPage } from './add-edit-temperature-record.page';
import { SelectsModule } from 'src/app/components/selects/selects.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddEditTemperatureRecordPageRoutingModule,
    SelectsModule
  ],
  declarations: [AddEditTemperatureRecordPage]
})
export class AddEditTemperatureRecordPageModule {}
