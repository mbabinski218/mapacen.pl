import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '@modules/admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule { }
