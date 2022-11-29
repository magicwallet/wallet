import {Chain} from './chain';
import {AssetType} from './asset-type';

export class Asset {
  chain: Chain;
  token_id: string;

  constructor(chain: Chain, token_id: string = '') {
    this.chain = chain;
    this.token_id = token_id;
  }

  static fromID(id: string): Asset {
    const parts = id.split('_');
    //TODO
    if (parts.length === 0) {
      // crash
    }
    const chain = parts[0] as Chain;
    if (parts.length === 1) {
      return new Asset(chain);
    }
    return new Asset(chain, parts[1]);
  }

  getType(): AssetType {
    if (this.token_id.length === undefined || this.token_id.length === 0) {
      return AssetType.NATIVE;
    }
    return AssetType.TOKEN;
  }

  getId(): string {
    switch (this.getType()) {
      case AssetType.NATIVE:
        return this.chain;
      default:
        return this.chain + '_' + this.token_id;
    }
  }
}
