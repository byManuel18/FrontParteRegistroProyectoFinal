import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RawMaterialRecordPage } from './raw-material-record.page';

const routes: Routes = [
  {
    path: '',
    component: RawMaterialRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RawMaterialRecordPageRoutingModule {}
