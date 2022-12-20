import {hash} from './hash';
import {ensRegistry, contractSelectors, nowhere} from './consts';
import {Chain} from '@magicwallet/chain-types';
import {ContractService} from '@magicwallet/chain-services';

// https://docs.ens.domains/dapp-developer-guide/resolving-names
export const resolve = async (name: string, chain: Chain, svc: ContractService): Promise<string | null> => {
  if (chain !== Chain.ETHEREUM) {
    return null;
  }
  if (!name.endsWith('.eth')) {
    return null;
  }
  // 1. Normalize and hash the name
  // 2. Call resolver() on the ENS registry and pass name from above step. It must return an address of a resolver.
  // 3. Call resolver with name hash from step 1.

  const hashedName = hash(name);

  const resolverAddress = await getResolverAddress(hashedName, chain, svc);
  if (resolverAddress === null) {
    return null;
  }

  const resolvedAddress = await resolveName(hashedName, resolverAddress, chain, svc);
  if (resolvedAddress === null) {
    return null;
  }

  return resolvedAddress;
};

const resolveName = async (hashedName: string, resolverAddress: string, chain: Chain, svc: ContractService) => {
  const payload = constructPayload(contractSelectors.resolver_addrBytes32, hashedName);
  const result = await svc.readContract(chain, nowhere, resolverAddress, payload);
  const resultBig = BigInt(result);
  return resultBig > 0 ? '0x' + resultBig.toString(16) : null;
};

const getResolverAddress = async (hashedName: string, chain: Chain, svc: ContractService) => {
  const payload = constructPayload(contractSelectors.ensRegistry_resolver, hashedName);
  const result = await svc.readContract(chain, nowhere, ensRegistry, payload);
  const resultBig = BigInt(result);
  return resultBig > 0 ? '0x' + resultBig.toString(16) : null;
};

const constructPayload = (selector: contractSelectors, arg: string) => {
  if (arg.startsWith('0x')) {
    arg = arg.slice(2);
  }

  return selector + arg;
};
