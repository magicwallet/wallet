import {GetQuote, Quote} from './model';
import {QuoteRequest} from '../../model';

// documentation: https://docs.ramp.network/rest-api-v3-reference

export class Client {
  readonly api_key: string;
  readonly url = 'https://api-instant.ramp.network';
  readonly redirectURL = 'https://buy.ramp.network';

  constructor(api_key: string) {
    this.api_key = api_key;
  }

  getQuote(quoteRequest: QuoteRequest): Promise<Quote> {
    const params: GetQuote = {
      cryptoAssetSymbol: quoteRequest.cryptoCurrency,
      fiatCurrency: quoteRequest.fiatCurrency,
      fiatValue: quoteRequest.amount,
    };
    const url = `${this.url}/api/host-api/v3/onramp/quote/all?hostApiKey=${this.api_key}`;

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((rate: Quote) => {
        return rate;
      });
  }
}
