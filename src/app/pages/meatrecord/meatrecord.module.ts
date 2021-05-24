import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeatrecordPageRoutingModule } from './meatrecord-routing.module';

import { MeatrecordPage } from './meatrecord.page';
import { TableModule } from 'src/app/components/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeatrecordPageRoutingModule,
    TableModule
  ],
  declarations: [MeatrecordPage]
})
export class MeatrecordPageModule {}
