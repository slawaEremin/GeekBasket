
export interface PromocodeSuccess {
  discounttype: string;
  amount: number;
}

interface Error {
  field: string;
  message: string;
}

export interface PromocodeError {
  errors: Error[];
}

export type PromocodeResponse = PromocodeSuccess;
