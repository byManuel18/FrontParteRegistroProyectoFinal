import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TraceabilityOfMeatPage } from './traceability-of-meat.page';

const routes: Routes = [
  {
    path: '',
    component: TraceabilityOfMeatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TraceabilityOfMeatPageRoutingModule {}
