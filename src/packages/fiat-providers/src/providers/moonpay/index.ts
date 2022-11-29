import {FiatProvider, ProviderName} from '../../fiat-provider';
import {Client} from './client';
import {QuoteData, QuoteRequest, QuoteResult} from '../../model';
import {BuyQuote} from './model';

export class MoonPayProvider implements FiatProvider {
  client: Client;

  constructor(widget_id: string) {
    this.client = new Client(widget_id);
  }

  name = ProviderName.MOONPAY;

  getQuote(quoteRequest: QuoteRequest): Promise<QuoteResult> {
    return this.client.getQuote(quoteRequest).then(quote => {
      return new QuoteResult({
        provider: this.name,
        quote: this.createQuote(quote),
        redirectURL: this.createRedirectURL(quoteRequest),
      });
    });
  }

  createQuote(rate: BuyQuote): QuoteData {
    return new QuoteData(
      rate.baseCurrencyCode,
      rate.quoteCurrencyCode,
      rate.baseCurrencyAmount,
      rate.quoteCurrencyAmount,
      Number(rate.quoteCurrencyPrice),
      0,
    );
  }

  createRedirectURL(quoteRequest: QuoteRequest): string {
    const params = new URLSearchParams({
      apiKey: this.client.api_key,
      currencyCode: quoteRequest.cryptoCurrency,
      baseCurrencyAmount: String(quoteRequest.amount),
      baseCurrencyCode: quoteRequest.fiatCurrency,
      walletAddress: quoteRequest.address,
    }).toString();

    return `${this.client.redirectURL}/?` + params.toString();
  }
}
