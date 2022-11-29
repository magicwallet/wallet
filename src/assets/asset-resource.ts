import {Asset} from '@magicwallet/chain-types';
import AssetsList from './chains/coins.json';

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
const assetsList: AssetResources = AssetsList.assets;

export function GetAssetResources(): AssetResource[] {
  return Object.keys(assetsList).map(key => assetsList[key]);
}

export function GetAssetResource(asset: Asset): AssetResource | undefined {
  return assetsList[asset.getId()] as AssetResource;
}

export function GetBuyAssetResources(): AssetResource[] {
  return Object.keys(assetsList)
    .map(key => assetsList[key])
    .filter(asset => asset.info.is_buy_available === true);
}
