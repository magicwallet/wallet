export class BuyRate {
  currency: string;
  amount: string;
  fiat_amount: string;
  fiat_currency: string;
  rate: string;
}

export class Country {
  enabled: boolean;
}

export class Data<T> {
  data: T;
}
