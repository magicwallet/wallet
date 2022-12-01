import {Tickers} from './model';
import {Price} from './../../model';
import {TWAsset} from './TWAsset';

export class Client {
  readonly url = 'https://market.trustwallet.com';

  constructor() {}

  getPrice(currency: string, assets: TWAsset[]): Promise<Price[]> {
    const params = {
      currency: currency,
      assets: assets.map(asset => asset.getId()),
    };
    return fetch(this.url + '/v1/tickers', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((tickers: Tickers) => {
        return tickers.tickers.map(
          ticker => new Price(TWAsset.toAsset(TWAsset.fromId(ticker.id)), ticker.change_24h, ticker.price),
        );
      });
  }
}
