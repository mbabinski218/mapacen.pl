import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class OfferFormHandlerService {

  constructor(
    private fb: FormBuilder,
  ) { }

  setFormGroupForOfferAdd(formGroup: FormGroup): void {
    formGroup.addControl('price', this.fb.control(null, [Validators.required]));
    formGroup.addControl('product', this.fb.control(null, [Validators.required]));
    formGroup.addControl('salePoint', this.fb.control(null, [Validators.required]));
  }

  setFormGroupForOfferModify(formGroup: FormGroup): void {
    formGroup.addControl('offer', this.fb.control(null, [Validators.required]));
    formGroup.addControl('price', this.fb.control(null, [Validators.required]));
    formGroup.addControl('product', this.fb.control(null, [Validators.required]));
    formGroup.addControl('salePoint', this.fb.control(null, [Validators.required]));
  }
}
