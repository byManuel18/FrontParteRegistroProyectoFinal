import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WasteRecordPageRoutingModule } from './waste-record-routing.module';

import { WasteRecordPage } from './waste-record.page';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WasteRecordPageRoutingModule,
    TableModule
  ],
  declarations: [WasteRecordPage]
})
export class WasteRecordPageModule {}
