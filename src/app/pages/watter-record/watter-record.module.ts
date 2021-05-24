import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatterRecordPageRoutingModule } from './watter-record-routing.module';

import { WatterRecordPage } from './watter-record.page';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatterRecordPageRoutingModule,
    TableModule
  ],
  declarations: [WatterRecordPage]
})
export class WatterRecordPageModule {}
