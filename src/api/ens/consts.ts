// https://docs.ens.domains/ens-deployments
export const ensRegistry = '0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e';
export const nowhere = '0x0000000000000000000000000000000000000000';

// resolver(bytes32)
export enum contractSelectors {
  // resolver(bytes32)
  ensRegistry_resolver = '0x0178b8bf',

  // addr(bytes32)
  resolver_addrBytes32 = '0x3b3b57de',
}
