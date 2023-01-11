import { NestedDropdown } from "@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface";
import { AdminDropdownData } from "./admin-dropdown.interface";

export interface AdminFormResponse {
  dropdown: NestedDropdown<AdminDropdownData>,
}