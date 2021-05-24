import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatterRecordPage } from './watter-record.page';

const routes: Routes = [
  {
    path: '',
    component: WatterRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatterRecordPageRoutingModule {}
