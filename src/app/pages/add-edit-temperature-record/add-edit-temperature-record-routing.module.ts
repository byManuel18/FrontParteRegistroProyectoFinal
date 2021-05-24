import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditTemperatureRecordPage } from './add-edit-temperature-record.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditTemperatureRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditTemperatureRecordPageRoutingModule {}
