import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditTraceabilityOfMeatPage } from './add-edit-traceability-of-meat.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditTraceabilityOfMeatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditTraceabilityOfMeatPageRoutingModule {}
