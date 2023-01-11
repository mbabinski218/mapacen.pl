import { Component, Input } from '@angular/core';
import { AddModifyActionType } from '@modules/admin/types/admin-actions.interface';

@Component({
  selector: 'offer-type-switch',
  templateUrl: './offer-type-switch.component.html',
  styleUrls: ['./offer-type-switch.component.scss']
})

export class OfferTypeSwitchComponent {
  @Input() toggleValue: AddModifyActionType;
}
