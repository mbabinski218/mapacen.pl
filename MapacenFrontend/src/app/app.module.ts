import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@app/auth/auth.guard';
import { AppComponent } from '@app/app.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OffersComponent } from './modules/offers/offers.component';

@NgModule({
  declarations: [
    AppComponent,
    OffersComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    InputMaskModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
