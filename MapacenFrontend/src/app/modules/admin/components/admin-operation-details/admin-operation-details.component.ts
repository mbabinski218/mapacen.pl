import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminFormResponse } from '@modules/admin/interfaces/admin-form-response.interface';
import { AdminFormService } from '@modules/admin/services/admin-form.service';
import { ADMIN_RESPONSE_TOKEN } from '@modules/admin/tokens/admin-response.token';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';

@Component({
  selector: 'admin-operation-details',
  templateUrl: './admin-operation-details.component.html',
  styleUrls: ['./admin-operation-details.component.scss']
})
export class AdminOperationDetailsComponent implements OnInit {

  adminForm: FormGroup;
  operationText: string;
  operationType: string[];

  constructor(
    @Inject(ADMIN_RESPONSE_TOKEN) public formResponse: AdminFormResponse,
    private adminFormService: AdminFormService,
    private toastMessageService: ToastMessageService,
  ) { }

  ngOnInit(): void {
    this.adminForm = this.adminFormService.adminForm();
    this.operationText = this.formResponse.dropdown.text;
    this.operationType = this.formResponse.dropdown.data.operationType;
  }

  ngAfterViewInit(): void {
  }

  submitForm(): void {
    if (this.adminForm.valid) {
      this.adminForm.reset();
      //...
      return;
    }
    this.toastMessageService.notifyOfError("Błąd w wprowadzonych danych");
  }

  clearForm(): void {
    this.adminForm.reset()
  }

}
