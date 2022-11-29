import {Chain} from './chain';
import {AssetType} from './asset-type';

export class AssetTypeList {
  static types(chain: Chain): AssetType[] {
    switch (chain) {
      case Chain.ETHEREUM:
      case Chain.POLYGON:
      case Chain.ARBITRUM:
        return [AssetType.ERC20];
      case Chain.BSC_CHAIN:
        return [AssetType.BEP20];
      case Chain.BNB_CHAIN:
        return [AssetType.BEP2];
      case Chain.APTOS:
      case Chain.BITCOIN:
      case Chain.SOLANA:
      case Chain.COSMOS:
      case Chain.OSMOSIS:
        return [];
    }
  }
}
