import { NestedDropdown } from "@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface";
import { AdminDropdownData } from "@modules/admin/interfaces/admin-dropdown.interface";

export interface AdminFormResponse {
  dropdown: NestedDropdown<AdminDropdownData>,
}

export interface ChangedNames {
  id: number,
  changedName: string,
}