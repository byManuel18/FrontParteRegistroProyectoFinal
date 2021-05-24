import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditWatterRecordPage } from './add-edit-watter-record.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditWatterRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditWatterRecordPageRoutingModule {}
