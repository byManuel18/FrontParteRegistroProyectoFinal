import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditProduccionPageRoutingModule } from './add-edit-produccion-routing.module';

import { AddEditProduccionPage } from './add-edit-produccion.page';
import { TableModule } from 'src/app/components/table/table.module';
import { SelectsModule } from 'src/app/components/selects/selects.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddEditProduccionPageRoutingModule,
    TableModule,
    SelectsModule,
    MatTooltipModule
  ],
  declarations: [AddEditProduccionPage]
})
export class AddEditProduccionPageModule {}
