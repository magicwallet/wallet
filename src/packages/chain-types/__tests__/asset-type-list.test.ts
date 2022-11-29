import {AssetType, Chain, ChainList} from '../src';
import {AssetTypeList} from '../src/asset-type-list';

it('test types', () => {
  expect(AssetTypeList.types(Chain.ETHEREUM)).toStrictEqual([AssetType.ERC20]);
  expect(AssetTypeList.types(Chain.BNB_CHAIN)).toStrictEqual([AssetType.BEP2]);

  ChainList.forEach(chain => {
    expect(AssetTypeList.types(chain)).toBeTruthy();
  });
});
