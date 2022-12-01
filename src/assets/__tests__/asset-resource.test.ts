import {GetAssetResource} from '../asset-resource';
import {Asset, Chain, ChainList} from '@magicwallet/chain-types';

describe('test asset exist in asset resource', () => {
  test('token asset', () => {
    expect(GetAssetResource(new Asset(Chain.BNB_CHAIN, 'BTCB-1DE'))).toBeTruthy();
    expect(GetAssetResource(new Asset(Chain.BNB_CHAIN, 'false'))).toBeFalsy();
  });

  test.each(ChainList)('asset chain (%s) exist in asset resource', chain => {
    expect(GetAssetResource(new Asset(chain))).toBeTruthy();
  });
});
