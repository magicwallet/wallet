import {Asset, AssetType, Chain} from '@magicwallet/chain-types';

export type AssetResourcesList = {
  assets: AssetResources;
};
export type AssetResources = {[key: string]: AssetResource};
export type AssetResource = {
  asset: string;
  name: string;
  symbol: string;
  decimals: number;
  type: string; // Replace with AssetType
  info: {
    is_buy_available: boolean;
  };
};

export function GetAssetResource(asset: Asset): AssetResource | undefined {
  if (asset.getType() === AssetType.NATIVE) {
    return require('./chains/coins.json').assets[
      asset.getId()
    ] as AssetResource;
  }
  return GetAssetResources(asset.chain).assets[asset.getId()];
}

export function GetAssetResources(chain: Chain): AssetResourcesList {
  switch (chain) {
    case Chain.BNB_CHAIN:
      return require('./chains/binance.json');
    case Chain.ETHEREUM:
      return require('./chains/ethereum.json');
    case Chain.SOLANA:
      return require('./chains/solana.json');
    case Chain.APTOS:
    case Chain.ARBITRUM:
    case Chain.BSC_CHAIN:
    case Chain.COSMOS:
    case Chain.OSMOSIS:
    case Chain.POLYGON:
    case Chain.BITCOIN:
      return {assets: {}} as AssetResourcesList;
  }
}
