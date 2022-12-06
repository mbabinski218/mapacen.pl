import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyInputComponent } from '@shared/modules/my-input/my-input.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    MyInputComponent,
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
    MyInputComponent,
  ]
})
export class MyInputModule { }
