import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddEditWasteRecordPageRoutingModule } from './add-edit-waste-record-routing.module';
import { AddEditWasteRecordPage } from './add-edit-waste-record.page';
import { SelectsModule } from 'src/app/components/selects/selects.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddEditWasteRecordPageRoutingModule,
    SelectsModule
  ],
  declarations: [AddEditWasteRecordPage]
})
export class AddEditWasteRecordPageModule {}
