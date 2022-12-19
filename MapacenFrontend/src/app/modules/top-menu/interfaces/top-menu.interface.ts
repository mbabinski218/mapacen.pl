export interface idNameOnly {
  id: number,
  name: string,
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
  confirmedPassword: string;
  countyId: number;
}