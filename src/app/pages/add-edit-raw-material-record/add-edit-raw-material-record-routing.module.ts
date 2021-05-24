import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditRawMaterialRecordPage } from './add-edit-raw-material-record.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditRawMaterialRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditRawMaterialRecordPageRoutingModule {}
