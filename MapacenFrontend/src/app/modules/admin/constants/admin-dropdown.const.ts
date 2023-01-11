import { AdminDropdownData } from "@modules/admin/interfaces/admin-dropdown.interface";
import { NestedDropdown } from "@shared/modules/lz-nested-dropdown/interfaces/nested-dropdown.interface";
import { OfferComponent } from "../pages/offer/offer.component";
import { OfferService } from "../pages/offer/services/offer.service";
import { AdminOperationType } from "../types/admin-operations.types";

export const AdminDropDown: NestedDropdown<AdminDropdownData>[] = 
[
  {
    text: 'Oferta',
    data: {
      operationType: [AdminOperationType.OFFER_ADD, AdminOperationType.OFFER_MODIFY],
      formComponent: OfferComponent,
      formProvider: OfferService,
    }
  },
  // {
  //   text: 'Produkt',
  //   data: {
  //     operationType: [AdminOperationType.PRODUCT_ADD, AdminOperationType.PRODUCT_MODIFY],
  //     formComponent: ,
  //     formProvider: ,
  //   }
  // },
  // {
  //   text: 'Kategoria',
  //   data: {
  //     operationType: [AdminOperationType.CATEGORY_ADD, AdminOperationType.CATEGORY_MODIFY],
  //     formComponent: ,
  //     formProvider: ,
  //   }
  // },
  // {
  //   text: 'Punkt sprzedaży',
  //   data: {
  //     operationType: [AdminOperationType.SALE_POINT_ADD, AdminOperationType.SALE_POINT_MODIFY],
  //     formComponent: ,
  //     formProvider: ,
  //   }
  // },
  // {
  //   text: 'Użytkownik',
  //   data: {
  //     operationType: [AdminOperationType.USER_PERMISSIONS, AdminOperationType.USER_BAN],
  //     formComponent: ,
  //     formProvider: ,
  //   }
  // },
];