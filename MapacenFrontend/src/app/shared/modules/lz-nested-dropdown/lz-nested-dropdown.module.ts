import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LzNestedDropdownComponent } from './lz-nested-dropdown.component';
import { DropdownItemComponent } from './components/dropdown-item/dropdown-item.component';

@NgModule({
  declarations: [
    LzNestedDropdownComponent,
    DropdownItemComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    LzNestedDropdownComponent,
  ],
})
export class LzNestedDropdownModule { }
