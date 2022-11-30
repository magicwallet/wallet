import {
  assetAddToList,
  assetsBalancesUpdate,
  BalancesMap,
  marketUpdateAssetFiatValue,
  marketUpdatePrices,
  marketUpdateTotalFiatValue,
} from '../../core/reducers/assets';
import {Asset} from '@magicwallet/chain-types';
import {AppDispatch} from '../../core/store';
import {GetAssetResources} from '../../assets/asset-resource';
import {MarketFetcher, Price} from '@magicwallet/market-provider';
import {AssetService, BalanceService} from '@magicwallet/chain-services';
import {Wallet} from '@magicwallet/types';

export class WalletService {
  dispatch: AppDispatch;
  wallet: Wallet;

  assetResources = GetAssetResources();
  marketProvider = new MarketFetcher();
  assetService = new AssetService();
  balanceService = new BalanceService();

  constructor(dispatch: AppDispatch, wallet: Wallet) {
    this.dispatch = dispatch;
    this.wallet = wallet;
  }

  refresh(currency: string) {
    return this.dispatch(assetAddToList(this.assetResources))
      .then(_ => {
        return this.assetService.getAssets(this.wallet.accounts);
      })
      .then(assets => {
        return this.balanceService.getBalances(this.wallet.accounts, assets);
      })
      .then(assets => {
        return this.dispatch(assetsBalancesUpdate(this.wallet, assets));
      })
      .then(assets => {
        return this.updatePrices(currency, assets.payload.balances);
      });
  }

  updatePrices(currency: string, balances: BalancesMap) {
    return this.marketProvider
      .getPrice(
        currency,
        Object.keys(balances).map(key => Asset.fromID(key)),
      )
      .then(prices => {
        return this.dispatch(marketUpdatePrices(prices.prices)).then(_ => {
          return this.updateFiat(prices.prices);
        });
      });
  }

  updateFiat(prices: Price[]) {
    return this.dispatch(
      marketUpdateAssetFiatValue(this.wallet.id, prices),
    ).then(_ => this.dispatch(marketUpdateTotalFiatValue(this.wallet.id)));
  }
}
