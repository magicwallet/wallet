import {ChainProvider} from '../../chain-provider';
import {Asset, AssetBalance, Chain} from '@magicwallet/chain-types';
import {JSOPRPCClient} from '@magicwallet/json-rpc';

enum METHOD {
  ETH_GET_BALANCE = 'eth_getBalance',
  ETH_BLOCK_NUMBER = 'eth_blockNumber',
  ETH_CALL = 'eth_call',
}

export class ChainProviderEVM implements ChainProvider {
  client: JSOPRPCClient;
  chain: Chain;

  constructor(url: string, chain: Chain) {
    this.client = new JSOPRPCClient(url);
    this.chain = chain;
  }

  async getBalances(address: string, assets: Asset[]): Promise<AssetBalance[]> {
    return this.client.call<string>(METHOD.ETH_GET_BALANCE, [address, 'latest']).then(balance => {
      return assets.map(asset => {
        return new AssetBalance(asset, BigInt(balance));
      });
    });
  }

  getAssets(_: string): Promise<Asset[]> {
    return Promise.resolve([new Asset(this.chain)]);
  }

  async getLatestBlock(): Promise<number> {
    return this.client.call<string>(METHOD.ETH_BLOCK_NUMBER, ['latest']).then(block => {
      return Promise.resolve(parseInt(block, 16));
    });
  }

  async readContract(from: string, to: string, data: string): Promise<string> {
    return await this.client.call<string>(METHOD.ETH_CALL, [{from, to, data}, 'latest']);
  }
}
