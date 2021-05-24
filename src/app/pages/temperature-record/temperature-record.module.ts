import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemperatureRecordPageRoutingModule } from './temperature-record-routing.module';

import { TemperatureRecordPage } from './temperature-record.page';
import { TableModule } from 'src/app/components/table/table.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TemperatureRecordPageRoutingModule,
    TableModule,
    MatTooltipModule
  ],
  declarations: [TemperatureRecordPage]
})
export class TemperatureRecordPageModule {}
