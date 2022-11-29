import {Asset} from '@magicwallet/chain-types';
import {Prices} from '@magicwallet/market-provider';

export interface MarketProvider {
  getPrice(currency: string, assets: Asset[]): Promise<Prices>;
}
