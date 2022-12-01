export class Response<T> {
  response: T;
}

export class Quote {
  fiatCurrency: string;
  cryptoCurrency: string;
  fiatAmount: number;
  cryptoAmount: number;
  network: string;
  totalFee: number;
}

export class Asset {
  symbol: string;
  chain: string;
}

export class Assets {
  assets: Asset[];
}
