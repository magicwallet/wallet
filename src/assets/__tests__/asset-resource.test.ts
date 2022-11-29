import {GetAssetResource} from '../asset-resource';
import {Asset, ChainList} from '@magicwallet/chain-types';

describe('test asset exist in asset resource', () => {
  test.each(ChainList)('asset chain (%s) exist in asset resource', chain => {
    expect(GetAssetResource(new Asset(chain))).toBeTruthy();
  });
});
