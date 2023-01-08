export interface MainOffer {
  count: number,
  offers: Offers[],
}

export interface Offers {
  id: number,
  price: number,
  product: Product,
  salesPoint: SalesPoint,
  opened?: boolean,
  comments?: MyComment[],
  favourite?: boolean,
}

export interface Product {
  name: string,
  category: Category,
}

export interface Category {
  id: number,
  name: string,
}

export interface SalesPoint {
  id: number,
  name: string,
  address: Address,
}

export interface Address {
  city: string,
  street: string,
  postalCode: string,
  number: number,
  county: County,
}

export interface County {
  id: number,
  name: string,
}

export interface MyComment {
  likes: number,
  disLikes: number,
  content: string,
  author: string,
  authorId: number,
  id: number,
}