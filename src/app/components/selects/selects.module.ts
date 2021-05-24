import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectsComponent } from './selects.component';



@NgModule({
  declarations: [SelectsComponent],
  imports: [
    CommonModule
  ],
  exports:[SelectsComponent],
})
export class SelectsModule { }
