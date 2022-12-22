import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from '@modules/offers/offers.component';

@NgModule({
  declarations: [
    OffersComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    OffersComponent,
  ],
})
export class OffersModule { }
