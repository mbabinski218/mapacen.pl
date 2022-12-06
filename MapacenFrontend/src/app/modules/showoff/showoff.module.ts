import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyInputModule } from '@shared/modules/my-input/my-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ShowoffComponent } from '@modules/showoff/showoff.component';
import { ShowoffService } from '@modules/showoff/api/showoff.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [
    ShowoffComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MyInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,
  ],
  exports: [
    ShowoffComponent,
  ],
  providers: [
    ShowoffService,
  ],
})
export class ShowoffModule { }
