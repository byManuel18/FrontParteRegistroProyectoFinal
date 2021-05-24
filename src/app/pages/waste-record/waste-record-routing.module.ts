import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WasteRecordPage } from './waste-record.page';

const routes: Routes = [
  {
    path: '',
    component: WasteRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WasteRecordPageRoutingModule {}
