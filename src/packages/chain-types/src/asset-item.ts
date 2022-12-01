import {AssetInfo} from './asset-info';
import {AssetBalanceFiat} from './asset-balance';
import {Asset} from './asset';

export class AssetItem {
  asset: Asset;
  info: AssetInfo;
  details: AssetDetails;
  balance: AssetBalanceFiat;

  constructor(asset: Asset, info: AssetInfo, details: AssetDetails, balance: AssetBalanceFiat) {
    this.asset = asset;
    this.info = info;
    this.details = details;
    this.balance = balance;
  }
}

export class AssetDetails {
  is_buy_available: boolean;

  constructor(is_buy_available: boolean) {
    this.is_buy_available = is_buy_available;
  }
}
