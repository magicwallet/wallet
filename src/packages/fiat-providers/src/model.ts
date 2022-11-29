import {ProviderName} from './fiat-provider';

export type QuoteRequest = {
  address: string;
  fiatCurrency: string;
  cryptoCurrency: string;
  amount: number;
};

export class QuoteResult {
  provider: ProviderName;
  quote: QuoteData;
  redirectURL: string;

  constructor(data: Partial<QuoteResult>) {
    Object.assign(this, data);
  }
}

export class QuoteData {
  fiatCurrency: string;
  cryptoCurrency: string;
  fiatAmount: number;
  cryptoAmount: number;
  rate: number;
  totalFee: number;

  constructor(
    fiatCurrency: string,
    cryptoCurrency: string,
    fiatAmount: number,
    cryptoAmount: number,
    rate: number,
    totalFee: number,
  ) {
    this.fiatCurrency = fiatCurrency;
    this.cryptoCurrency = cryptoCurrency;
    this.fiatAmount = fiatAmount;
    this.cryptoAmount = cryptoAmount;
    this.rate = rate;
    this.totalFee = totalFee;
  }
}
