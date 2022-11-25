import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from '@modules/authentication/authentication.component';

@NgModule({
  declarations: [
    AuthenticationComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AuthenticationComponent,
  ],
})
export class AuthenticationModule { }
