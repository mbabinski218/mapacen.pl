import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '@modules/home/home.component';
import { HomeRoutingModule } from '@modules/home/home-routing.module';
import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { ShowoffModule } from '@modules/showoff/showoff.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AdminComponent } from '../admin/admin.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AuthenticationModule,
    MatSlideToggleModule,
    MatIconModule,
    ReactiveFormsModule,
    MatToolbarModule,
    ShowoffModule,
    MatButtonModule,
    MatIconModule,

  ],
})
export class HomeModule { }
