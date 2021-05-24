import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemperatureRecordPage } from './temperature-record.page';

const routes: Routes = [
  {
    path: '',
    component: TemperatureRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemperatureRecordPageRoutingModule {}
