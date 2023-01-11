import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '@modules/admin/admin.component';
import { AdminRoutingModule } from '@modules/admin/admin-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminPagesModule } from '@modules/admin/pages/admin-pages.module';
import { AdminOperationDetailsComponent } from './components/admin-operation-details/admin-operation-details.component';
import { AdminOperationTypeComponent } from './components/admin-operation-type/admin-operation-type.component';
import { LzNestedDropdownModule } from '@shared/modules/lz-nested-dropdown/lz-nested-dropdown.module';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';

@NgModule({
  declarations: [
    AdminComponent,
    AdminOperationDetailsComponent,
    AdminOperationTypeComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AdminPagesModule,
    LzNestedDropdownModule,
  ]
})
export class AdminModule { }
