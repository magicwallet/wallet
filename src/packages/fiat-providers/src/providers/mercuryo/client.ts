import {Data, BuyRate} from './model';
import {QuoteRequest} from '../../model';

// documentation: https://widget.mercuryo.io/docs.html

export class Client {
  readonly widget_id: string;
  readonly url = 'https://api.mercuryo.io';
  readonly redirectURL = 'https://exchange.mercuryo.io';

  constructor(widget_id: string) {
    this.widget_id = widget_id;
  }

  getQuote(quoteRequest: QuoteRequest): Promise<Data<BuyRate>> {
    const params = new URLSearchParams({
      from: quoteRequest.fiatCurrency,
      to: quoteRequest.cryptoCurrency,
      amount: String(quoteRequest.amount),
      widget_id: this.widget_id,
    });
    return fetch(`${this.url}/v1.6/widget/buy/rate?` + params)
      .then(res => res.json())
      .then((rate: Data<BuyRate>) => {
        return rate;
      });
  }
}
