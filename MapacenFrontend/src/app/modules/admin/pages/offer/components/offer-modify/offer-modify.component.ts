import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { OfferFormHandlerService } from '@modules/admin/pages/offer/services/offer-form-handler.service';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { MainOffer, Product, SalesPoint } from '@modules/offers/interfaces/offers.interface';

@Component({
  selector: 'offer-modify',
  templateUrl: './offer-modify.component.html',
  styleUrls: ['./offer-modify.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class OfferModifyComponent implements OnInit {

  form: FormGroup;
  products: Product[] = [];
  salePointsFixedNames: changedNames[] = [];
  offersFixedNames: changedNames[] = [];
  salePoints: SalesPoint[] = [];
  offers: MainOffer;

  constructor(
    private controlContainer: ControlContainer,
    private offerFormHandlerService: OfferFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.offerFormHandlerService.setFormGroupForOfferModify(this.form);

    this.products = this.adminStorageService.products;
    this.offers = this.adminStorageService.offers;
    this.salePoints = this.adminStorageService.salePoints;

    this.offers.offers.map((res) => {
      this.offersFixedNames.push({
        id: res.id,
        changedName: 'id: ' + res.id + ', ' + res.product.name + ' ' + res.price + 'zł',
      })
    })

    this.salePoints.map((res) => {
      this.salePointsFixedNames.push({
        id: res.id,
        changedName: res.name + ', ' + res.address.city + ' ul. ' + res.address.street + ' ' + res.address.number,
      })
    })
  }
}

interface changedNames {
  id: number,
  changedName: string,
}