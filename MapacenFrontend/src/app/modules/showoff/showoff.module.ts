import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ShowoffComponent } from '@modules/showoff/showoff.component';
import { ShowoffService } from '@modules/showoff/api/showoff.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MyInputModule } from '@shared/modules/my-input/my-input.module';

@NgModule({
  declarations: [
    ShowoffComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxJsonViewerModule,
    MyInputModule,
  ],
  exports: [
    ShowoffComponent,
  ],
  providers: [
    ShowoffService,
  ],
})
export class ShowoffModule { }
