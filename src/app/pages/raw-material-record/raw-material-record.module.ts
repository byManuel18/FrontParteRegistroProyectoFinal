import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RawMaterialRecordPageRoutingModule } from './raw-material-record-routing.module';

import { RawMaterialRecordPage } from './raw-material-record.page';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RawMaterialRecordPageRoutingModule,
    TableModule
  ],
  declarations: [RawMaterialRecordPage]
})
export class RawMaterialRecordPageModule {}
