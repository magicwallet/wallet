import {QuoteRequest, QuoteResult} from './model';

export interface FiatProvider {
  name: ProviderName;

  getQuote(quoteRequest: QuoteRequest): Promise<QuoteResult>;
}

export enum ProviderName {
  MERCURYO = 'Mercuryo',
  MOONPAY = 'MoonPay',
  RAMP = 'Ramp',
  TRANSAK = 'Transak',
}
