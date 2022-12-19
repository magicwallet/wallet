import {Chain} from '@magicwallet/chain-types';
import {ChainProvider, ChainProviderEVM} from '@magicwallet/chain-providers';
import {ProviderFactory} from './provider-factory';

export class ContractService {
  providers: Map<Chain, ChainProvider>;

  constructor(providers = ProviderFactory.setup()) {
    this.providers = providers;
  }

  async readContract(chain: Chain, from: string, to: string, data: string): Promise<string> {
    switch (chain) {
      case Chain.ETHEREUM:
        return await this.handleEthereumProvider(this.providers.get(chain) as ChainProviderEVM, from, to, data);
      default:
        throw new Error(`Chain is not supported: ${chain.toString()}`);
    }
  }

  async handleEthereumProvider(provider: ChainProviderEVM | undefined, from: string, to: string, data: string) {
    if (provider === undefined) {
      throw new Error('undefined provider');
    }

    const result = await provider.readContract(from, to, data);
    return result;
  }
}
