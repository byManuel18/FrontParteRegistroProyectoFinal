import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditMeatRecordPage } from './add-edit-meat-record.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditMeatRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditMeatRecordPageRoutingModule {}
