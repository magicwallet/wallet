export class Resource<T> {
  type: string;
  data: T;
}

export class ResourceCoin {
  coin: ResourceCoinValue;
}

export class ResourceCoinValue {
  value: string;
}

export enum ResourceType {
  COIN = '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>',
}
