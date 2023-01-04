export interface idNameOnly {
  id: number,
  name: string,
}

export interface Login {
  email: string,
  password: string,
}

export interface Register {
  name: string,
  email: string,
  password: string,
  confirmedPassword: string,
  countyId: number,
}

export interface Token {
  tokenContent: string,
}

export interface TokenContent {
  name: string,
  email: string,
  role: string,
  countyId: string,
  userId: string,
  canComment: string,
  favoritesId: string,
  exp: number,
}

export interface OfferContent {
  search: string,
  category: string,
}