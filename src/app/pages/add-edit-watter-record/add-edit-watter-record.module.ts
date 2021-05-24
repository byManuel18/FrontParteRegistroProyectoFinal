import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditWatterRecordPageRoutingModule } from './add-edit-watter-record-routing.module';

import { AddEditWatterRecordPage } from './add-edit-watter-record.page';
import { SelectsModule } from 'src/app/components/selects/selects.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddEditWatterRecordPageRoutingModule,
    SelectsModule
  ],
  declarations: [AddEditWatterRecordPage]
})
export class AddEditWatterRecordPageModule {}
