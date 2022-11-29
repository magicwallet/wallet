import {FiatProvider, ProviderName} from '../../fiat-provider';
import {QuoteData, QuoteRequest, QuoteResult} from '../../model';

import {Client} from './client';
import {BuyRate} from './model';

export class MercuryoProvider implements FiatProvider {
  client: Client;

  constructor(widget_id: string) {
    this.client = new Client(widget_id);
  }

  name = ProviderName.MERCURYO;

  getQuote(quoteRequest: QuoteRequest): Promise<QuoteResult> {
    return this.client.getQuote(quoteRequest).then(rate => {
      return new QuoteResult({
        provider: this.name,
        quote: this.createQuote(rate.data),
        redirectURL: this.createRedirectURL(quoteRequest),
      });
    });
  }

  createQuote(rate: BuyRate): QuoteData {
    return new QuoteData(
      rate.fiat_currency,
      rate.currency,
      Number(rate.fiat_amount),
      Number(rate.amount),
      Number(rate.rate),
      0,
    );
  }

  createRedirectURL(quoteRequest: QuoteRequest): string {
    const params = new URLSearchParams({
      widget_id: this.client.widget_id,
      fiat_amount: String(quoteRequest.amount),
      address: quoteRequest.address,
      currency: quoteRequest.cryptoCurrency,
    });
    return `${this.client.redirectURL}/?` + params.toString();
  }
}
