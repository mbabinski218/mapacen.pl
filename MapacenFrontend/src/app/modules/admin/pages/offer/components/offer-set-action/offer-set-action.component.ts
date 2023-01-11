import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { AddModifyActionType } from '@modules/admin/types/admin-actions.interface';

@Component({
  selector: 'offer-set-action',
  templateUrl: './offer-set-action.component.html',
  styleUrls: ['./offer-set-action.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class OfferSetActionComponent implements OnInit {

  form: FormGroup;
  prevType: AddModifyActionType = 'Add';

  constructor(
    private controlContainer: ControlContainer,
  ) { }

  ngOnInit() {
    this.form = this.controlContainer.control as FormGroup;
  }

  handleActionTypeChange(prevType: MatButtonToggleChange) {
    this.prevType = prevType.value as AddModifyActionType;
  }
}
