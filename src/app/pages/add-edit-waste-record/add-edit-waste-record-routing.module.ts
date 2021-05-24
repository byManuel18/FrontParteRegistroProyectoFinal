import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditWasteRecordPage } from './add-edit-waste-record.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditWasteRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditWasteRecordPageRoutingModule {}
