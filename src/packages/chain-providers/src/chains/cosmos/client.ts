import {Balances} from './model';

export class Client {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getBalance(address: string): Promise<Balances> {
    return fetch(this.url + '/cosmos/bank/v1beta1/balances/' + address)
      .then(res => res.json())
      .then((balances: Balances) => {
        return balances;
      });
  }
}
