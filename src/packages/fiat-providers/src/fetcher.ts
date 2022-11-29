import {QuoteResult} from './model';
import {FiatProvider} from './fiat-provider';
import {Asset} from '@magicwallet/chain-types';
import {Mapper} from './mapper';

export class QuoteFetcher {
  providers: Array<FiatProvider>;

  constructor(providers: Array<FiatProvider>) {
    this.providers = providers;
  }

  getQuote(
    fiatCurrency: string,
    asset: Asset,
    amount: number,
    address: string,
  ): Promise<QuoteResult[]> {
    return Promise.all(
      this.providers
        .flatMap(provider => {
          const cryptoCurrency = Mapper.getSymbol(asset, provider.name);
          if (cryptoCurrency !== undefined) {
            return provider.getQuote({
              cryptoCurrency: cryptoCurrency,
              fiatCurrency: fiatCurrency,
              amount: amount,
              address: address,
            });
          }
        })
        .filter((quote): quote is Promise<QuoteResult> => Boolean(quote)),
    )
      .then(quotes => {
        return quotes
          .filter(quote => quote.quote.cryptoAmount > 0)
          .sort((q1, q2) => q1.quote.cryptoAmount - q2.quote.cryptoAmount);
      })
      .then(quotes => {
        if (quotes.length === 0) {
          return Promise.reject('No quotes available');
        }
        return quotes;
      });
  }
}
