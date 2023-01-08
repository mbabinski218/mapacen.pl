import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@app/auth/auth.guard';
import { AppComponent } from '@app/app.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { HttpClientModule } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { AppRoutingModule } from '@app/app-routing.module';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const customIcons: [string, string][] = [
  ["my-like", "like.svg"],
  ["my-dislike", "dislike.svg"],
  ["my-heart", "heart.svg"],
];

@NgModule({
  declarations: [
    AppComponent,
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
export class AppModule { 
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    customIcons.forEach(([iconName, icon]) => {
      iconRegistry.addSvgIcon(
        iconName,
        sanitizer.bypassSecurityTrustResourceUrl(`../assets/images/${icon}`),
      );
    });
  }
}
