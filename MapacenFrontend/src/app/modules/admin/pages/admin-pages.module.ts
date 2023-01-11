import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from '@shared/shared.module';
import { OfferAddComponent } from './offer/components/offer-add/offer-add.component';
import { OfferModifyComponent } from './offer/components/offer-modify/offer-modify.component';
import { OfferSetActionComponent } from './offer/components/offer-set-action/offer-set-action.component';
import { OfferTypeSwitchComponent } from './offer/components/offer-type-switch/offer-type-switch.component';
import { OfferComponent } from './offer/offer.component';
import { OfferFormHandlerService } from './offer/services/offer-form-handler.service';
import { MyInputModule } from '@shared/modules/my-input/my-input.module';

@NgModule({
  declarations: [
    OfferComponent,
    OfferTypeSwitchComponent,
    OfferSetActionComponent,
    OfferModifyComponent,
    OfferAddComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatSelectModule,
    SharedModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MyInputModule,
  ],
  providers: [
    OfferFormHandlerService,
  ]
})
export class AdminPagesModule { }
