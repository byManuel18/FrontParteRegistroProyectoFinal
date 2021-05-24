import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeatrecordPage } from './meatrecord.page';

const routes: Routes = [
  {
    path: '',
    component: MeatrecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeatrecordPageRoutingModule {}
