import {BuyQuote} from './model';
import {QuoteRequest} from '../../model';

// documentation: https://dashboard.moonpay.com/api_reference/client_side_api

export class Client {
  readonly api_key: string;
  readonly url = 'https://api.moonpay.com';
  readonly redirectURL = 'https://buy.moonpay.com';

  constructor(api_key: string) {
    this.api_key = api_key;
  }

  getQuote(quoteRequest: QuoteRequest): Promise<BuyQuote> {
    const params = new URLSearchParams({
      apiKey: this.api_key,
      baseCurrencyCode: quoteRequest.fiatCurrency.toLowerCase(),
      baseCurrencyAmount: String(quoteRequest.amount),
      extraFeePercentage: String(1),
      areFeesIncluded: String(true),
    });
    return fetch(
      `${
        this.url
      }/v3/currencies/${quoteRequest.cryptoCurrency.toLowerCase()}/buy_quote?` +
        params,
    )
      .then(res => res.json())
      .then((rate: BuyQuote) => {
        return rate;
      });
  }
}
