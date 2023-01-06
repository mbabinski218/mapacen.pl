import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OffersService } from '@modules/offers/api/offers.service';
import { OffersComponent } from '@modules/offers/offers.component';
import { DisableAreaModule } from '@shared/modules/disable-area/disable-area.module';
import { OfferExpandedComponent } from './components/offer-expanded/offer-expanded.component';

@NgModule({
  declarations: [
    OffersComponent,
    OfferExpandedComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    DisableAreaModule,
  ],
  exports: [
    OffersComponent,
  ],
  providers: [
    OffersService,
  ],
})
export class OffersModule { }
