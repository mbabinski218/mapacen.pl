export interface NestedDropdown<T> {
  text: DropDownText;
  data?: T,
  children?: NestedDropdown<T>[];
}

export type DropDownText = 'Oferta' | 'Produkt' | 'Kategoria' | 'Punkt sprzedaży' | 'Użytkownik';