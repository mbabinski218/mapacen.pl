export interface NestedDropdown<T> {
  text: string;
  data?: T,
  children?: NestedDropdown<T>[];
}
