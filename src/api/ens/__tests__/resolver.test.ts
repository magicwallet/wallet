import {hash} from '../hash';
import {resolve} from '../resolver';
import {Chain} from '@magicwallet/chain-types';
import {ContractService} from '@magicwallet/chain-services';
import {nowhere, ensRegistry, contractSelectors} from '../consts';

describe('ens resolver', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it('should normalize and hash name', async () => {
    const expected = '0xde9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f';
    const result = hash('foo.eth');
    expect(result).toEqual(expected);
  });

  it('should resolve name', async () => {
    const contractServiceMock = jest
      .spyOn(ContractService.prototype, 'readContract')
      .mockImplementation(async (_chain: Chain, _from: string, _to: string) => {
        if (_to === ensRegistry) {
          // mock ens registry response
          return '0x000000000000000000000000000000000000babe';
        }
        // mock the resolved address
        return '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
      });

    const svc = new ContractService();
    const fooEthHash = 'de9b09fd7c5f901e23a3f19fecc54828e9c848539801e86591bd9801b019f84f';
    const resolverPayload = contractSelectors.ensRegistry_resolver + fooEthHash;
    const addressPayload = contractSelectors.resolver_addrBytes32 + fooEthHash;

    const result = await resolve('foo.eth', Chain.ETHEREUM, svc);
    expect(result).toEqual('0xd8da6bf26964af9d7eed9e03e53415d37aa96045');
    expect(contractServiceMock).toHaveBeenCalledTimes(2);
    expect(contractServiceMock).toHaveBeenCalledWith(Chain.ETHEREUM, nowhere, ensRegistry, resolverPayload);
    expect(contractServiceMock).toHaveBeenCalledWith(Chain.ETHEREUM, nowhere, '0xbabe', addressPayload);
  });
});
