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

// Transak provider requires to pass network param, so we need to split ETH_polygon to eth and polygon
export function quoteSymbolSplit(symbol: string): {symbol: string; network: string} {
  const values = symbol.split('_');
  return {symbol: values[0], network: values[1] || ''};
}
