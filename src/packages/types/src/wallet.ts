import {Account} from './account';

export class Wallet {
  id: string;
  name: string;
  type: WalletType;
  accounts: [Account];

  constructor(id: string, name: string, type: WalletType, accounts: [Account]) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.accounts = accounts;
  }
}

export enum WalletType {
  WATCH = 'watch',
  SINGLE = 'single',
  MULTI = 'multi',
}
