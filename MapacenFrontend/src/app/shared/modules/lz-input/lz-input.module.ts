import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LzInputComponent } from '@shared/modules/lz-input/lz-input.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    LzInputComponent,
  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    InputMaskModule.forRoot({
      isAsync: false,
      inputSelector: 'input',
    }),
  ],
  exports: [
    LzInputComponent,
  ]
})
export class LzInputModule { }
