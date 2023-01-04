import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetPrecisionPipe } from '@shared/pipes/set-precision.pipe';

@NgModule({
  declarations: [
    SetPrecisionPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SetPrecisionPipe,
  ]
})
export class SharedModule { }
