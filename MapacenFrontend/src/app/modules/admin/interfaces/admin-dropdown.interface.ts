import { Type } from '@angular/core';
import { AdminOperationType } from '@modules/admin/types/admin-operations.types';

export interface AdminDropdownData {
  operationType: AdminOperationType[],
  formProvider: Type<unknown>,
  formComponent: Type<unknown>,
}