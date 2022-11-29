import {AssetType} from './asset-type';
import {Asset} from './asset';
import {Chain} from './chain';

export class AssetImageFormatter {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  url(asset: Asset): string {
    switch (asset.getType()) {
      case AssetType.NATIVE:
        return this.urlForChain(asset.chain);
      default:
        return `${this.endpoint}/blockchains/${asset.chain}/assets/${asset.token_id}/logo.png`;
    }
  }

  urlForChain(chain: Chain) {
    return `${this.endpoint}/blockchains/${chain}/info/logo.png`;
  }
}

// https://raw.githubusercontent.com/magicwallet/assets/master/blockchains/binance/info/logo.png
// https://raw.githubusercontent.com/magicwallet/assets/master/blockchains/binance/assets/ZEC-93E/logo.png
