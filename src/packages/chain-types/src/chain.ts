// enum values represent ids from https://github.com/trustwallet/wallet-core/blob/master/registry.json

export enum Chain {
  BITCOIN = 'bitcoin',
  ETHEREUM = 'ethereum',
  BNB_CHAIN = 'binance',
  BSC_CHAIN = 'smartchain',
  SOLANA = 'solana',
  APTOS = 'aptos',
  POLYGON = 'polygon',
  COSMOS = 'cosmos',
  OSMOSIS = 'osmosis',
  ARBITRUM = 'arbitrum',
}

export const ChainList = [
  Chain.BNB_CHAIN,
  Chain.ETHEREUM,
  Chain.BSC_CHAIN,
  Chain.APTOS,
  Chain.POLYGON,
  Chain.SOLANA,
  Chain.COSMOS,
  Chain.OSMOSIS,
  Chain.ARBITRUM,
];
