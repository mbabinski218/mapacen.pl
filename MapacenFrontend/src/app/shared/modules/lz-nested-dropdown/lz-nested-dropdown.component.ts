import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NestedDropdown } from './interfaces/nested-dropdown.interface';

@Component({
  selector: 'lz-nested-dropdown',
  templateUrl: './lz-nested-dropdown.component.html',
  styleUrls: ['./lz-nested-dropdown.component.scss']
})
export class LzNestedDropdownComponent {

  @Input() set data(value: NestedDropdown<unknown>[]) {
    this.navData = value;
  }
  @Input() set name(value: string) {
    this.functionName = value;
  }
  @Input() canBeLockable = false;
  @Output() dropdownChange = new EventEmitter<NestedDropdown<unknown>>();

  navData: NestedDropdown<unknown>[];
  functionName: string;

  changeDropdown(item: NestedDropdown<unknown>) {
    this.dropdownChange.emit(item);
    this.functionName = item.text;
  }
}
