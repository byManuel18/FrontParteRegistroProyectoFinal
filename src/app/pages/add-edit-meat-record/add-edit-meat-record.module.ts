import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddEditMeatRecordPageRoutingModule } from './add-edit-meat-record-routing.module';
import { AddEditMeatRecordPage } from './add-edit-meat-record.page';
import { SelectsModule } from 'src/app/components/selects/selects.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SelectsModule,
    AddEditMeatRecordPageRoutingModule
  ],
  declarations: [AddEditMeatRecordPage],
})
export class AddEditMeatRecordPageModule {}
