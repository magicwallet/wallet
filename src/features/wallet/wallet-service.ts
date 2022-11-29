import {
  assetAddToList,
  assetsBalancesUpdate,
  marketUpdateAssetFiatValue,
  marketUpdatePrices,
  marketUpdateTotalFiatValue,
} from '../../core/reducers/assets';
import {Asset} from '@magicwallet/chain-types';
import {AppDispatch} from '../../core/store';
import {GetAssetResources} from '../../assets/asset-resource';
import {MarketFetcher} from '@magicwallet/market-provider';
import {AssetService, BalanceService} from '@magicwallet/chain-services';
import {Wallet} from '@magicwallet/types';

export class WalletService {
  assetResources = GetAssetResources();
  marketProvider = new MarketFetcher();
  assetService = new AssetService();
  balanceService = new BalanceService();

  constructor() {}

  refresh(dispatch: AppDispatch, wallet: Wallet, currency: string) {
    return dispatch(assetAddToList(this.assetResources))
      .then(_ => {
        return this.assetService.getAssets(wallet.accounts);
      })
      .then(assets => {
        return this.balanceService.getBalances(wallet.accounts, assets);
      })
      .then(assets => {
        return dispatch(assetsBalancesUpdate(wallet, assets));
      })
      .then(assets => {
        return this.marketProvider
          .getPrice(
            currency,
            Object.keys(assets.payload.balances).map(key => Asset.fromID(key)),
          )
          .then(prices => {
            return dispatch(marketUpdatePrices(prices.prices)).then(_ => {
              return dispatch(
                marketUpdateAssetFiatValue(wallet.id, prices.prices),
              ).then(_ => {
                return dispatch(marketUpdateTotalFiatValue(wallet.id));
              });
            });
          });
      });
  }
}
