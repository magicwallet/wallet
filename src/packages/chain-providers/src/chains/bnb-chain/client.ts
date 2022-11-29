import {Account} from './model';

export class Client {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getAccount(address: string): Promise<Account> {
    return fetch(this.url + '/api/v1/account/' + address)
      .then(res => res.json())
      .then((account: Account) => {
        return account;
      });
  }
}
