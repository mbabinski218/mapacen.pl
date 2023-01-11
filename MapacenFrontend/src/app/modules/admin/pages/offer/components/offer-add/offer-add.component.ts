import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { SalesPoint } from '@modules/offers/interfaces/offers.interface';
import { OfferFormHandlerService } from '../../services/offer-form-handler.service';

@Component({
  selector: 'offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class OfferAddComponent implements OnInit {

  form: FormGroup;
  // offers: FormGroup;
  // products: FormGroup;
  salePoints: string[] = [];

  constructor(
    private controlContainer: ControlContainer,
    private offerFormHandlerService: OfferFormHandlerService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.offerFormHandlerService.setFormGroupForOfferAdd(this.form);
    // this.offerFormHandlerService.getSalePoints(Number(localStorage.getItem('userProfileCountyId'))).subscribe((res) => {
    //   this.salePoints = res.map((result) => result.name + ', ' + result.address.city + ' ul. ' + result.address.street + ' ' + result.address.number);
    //   //jeszcze strzal po oferty i produkty
    // });
  }
}
