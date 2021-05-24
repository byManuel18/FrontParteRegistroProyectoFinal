import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditProduccionPage } from './add-edit-produccion.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditProduccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditProduccionPageRoutingModule {}
