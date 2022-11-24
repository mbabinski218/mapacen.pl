import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '@modules/home/home.component';
import { HomeRoutingModule } from '@modules/home/home-routing.module';
import { HomeService } from '@modules/home/api/home.service';
import { MatButtonModule } from '@angular/material/button';
import { LzInputModule } from '@shared/modules/lz-input/lz-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    LzInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    HomeService,
  ],
})
export class HomeModule { }
