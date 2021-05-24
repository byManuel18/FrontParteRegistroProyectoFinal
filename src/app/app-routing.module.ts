import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule), canActivate : [AuthenticationService]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'meatrecord',
    loadChildren: () => import('./pages/meatrecord/meatrecord.module').then( m => m.MeatrecordPageModule)
  },
  {
    path: 'watter-record',
    loadChildren: () => import('./pages/watter-record/watter-record.module').then( m => m.WatterRecordPageModule)
  },
  {
    path: 'waste-record',
    loadChildren: () => import('./pages/waste-record/waste-record.module').then( m => m.WasteRecordPageModule)
  },
  {
    path: 'raw-material-record',
    loadChildren: () => import('./pages/raw-material-record/raw-material-record.module').then( m => m.RawMaterialRecordPageModule)
  },
  {
    path:'addedit-meatrecord',
    loadChildren:() =>import('./pages/add-edit-meat-record/add-edit-meat-record.module').then(m =>m.AddEditMeatRecordPageModule)
  },
  {
    path:"addedit-wasterecord",
    loadChildren:()=>import('./pages/add-edit-waste-record/add-edit-waste-record.module').then(m=>m.AddEditWasteRecordPageModule)
  },
  {
    path:"addedit-watterrecord",
    loadChildren:()=>import('./pages/add-edit-watter-record/add-edit-watter-record.module').then(m=>m.AddEditWatterRecordPageModule)
  },
  {
    path:"addedit-rawmaterial",
    loadChildren:()=>import('./pages/add-edit-raw-material-record/add-edit-raw-material-record.module').then(m=>m.AddEditRawMaterialRecordPageModule)
  },
  {
    path: 'add-edit-temperature-record',
    loadChildren: () => import('./pages/add-edit-temperature-record/add-edit-temperature-record.module').then( m => m.AddEditTemperatureRecordPageModule)
  },
  {
    path: 'temperaturerecord',
    loadChildren: () => import('./pages/temperature-record/temperature-record.module').then( m => m.TemperatureRecordPageModule)
  },
  {
    path: 'traceabilityofmeat',
    loadChildren: () => import('./pages/traceability-of-meat/traceability-of-meat.module').then( m => m.TraceabilityOfMeatPageModule)
  },
  {
    path: 'production',
    loadChildren: () => import('./pages/production/production.module').then( m => m.ProductionPageModule)
  },
  {
    path: 'add-edit-traceability-of-meat',
    loadChildren: () => import('./pages/add-edit-traceability-of-meat/add-edit-traceability-of-meat.module').then( m => m.AddEditTraceabilityOfMeatPageModule)
  },
  {
    path: 'add-edit-produccion',
    loadChildren: () => import('./pages/add-edit-produccion/add-edit-produccion.module').then( m => m.AddEditProduccionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
