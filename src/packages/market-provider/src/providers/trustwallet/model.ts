export class Tickers {
  currency: string;
  tickers: Ticker[];
}

export class Ticker {
  id: string;
  change_24h: number;
  price: number;

  constructor(id: string, change_24h: number, price: number) {
    this.id = id;
    this.change_24h = change_24h;
    this.price = price;
  }
}
