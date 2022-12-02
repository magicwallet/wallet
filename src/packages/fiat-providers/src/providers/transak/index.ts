import {FiatProvider, ProviderName} from '../../fiat-provider';
import {Client} from './client';
import {QuoteData, QuoteRequest, QuoteResult} from '../../model';
import {Quote, quoteSymbolSplit} from './model';

export class TransakProvider implements FiatProvider {
  client: Client;

  constructor(api_key: string) {
    this.client = new Client(api_key);
  }

  name = ProviderName.TRANSAK;

  getQuote(quoteRequest: QuoteRequest): Promise<QuoteResult> {
    return this.client.getQuote(quoteRequest).then(quote => {
      return new QuoteResult({
        provider: this.name,
        quote: this.createQuote(quote.response),
        redirectURL: this.createRedirectURL(quoteRequest),
      });
    });
  }

  createQuote(quote: Quote): QuoteData {
    return new QuoteData(
      quote.fiatCurrency,
      quote.cryptoCurrency,
      quote.fiatAmount,
      quote.cryptoAmount,
      quote.fiatAmount / quote.cryptoAmount,
      quote.totalFee,
    );
  }

  createRedirectURL(quoteRequest: QuoteRequest): string {
    const {symbol, network} = quoteSymbolSplit(quoteRequest.cryptoCurrency);
    const params = new URLSearchParams({
      apiKey: this.client.api_key,
      fiatAmount: String(quoteRequest.amount),
      fiatCurrency: quoteRequest.fiatCurrency,
      cryptoCurrencyCode: symbol,
      walletAddress: quoteRequest.address,
      disableWalletAddressForm: String(true),
      network: network,
    }).toString();

    return `${this.client.redirectURL}/?` + params.toString();
  }
}
