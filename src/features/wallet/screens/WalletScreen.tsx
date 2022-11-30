import React, {useEffect} from 'react';
import {FlatList, RefreshControl, SafeAreaView, StyleSheet} from 'react-native';
import {
  Props,
  Screen,
  ScreenNavigator,
  SelectAssetType,
} from '@magicwallet/navigation';
import {AssetListItem, WalletHeader} from '@magicwallet/views';
import {Asset} from '@magicwallet/chain-types';
import {Colors} from '@magicwallet/styles';
import {Wallet} from '@magicwallet/types';
import {WalletHeaderAction} from '@magicwallet/views/src/WalletHeader';
import {useAppDispatch, useAppSelector} from '../../../core/hooks';
import {
  GetAssetsSelector,
  GetTotalFiatValueSelector,
} from '../../../core/selectors/assets-selectors';
import {GetCurrentWallet} from '../selector';
import {GetCurrencySelector} from '../../Settings/selector';
import {WalletService} from '../wallet-service';

export const WalletScreen: React.FC<Props<Screen.WALLET>> = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const dispatch = useAppDispatch();
  const state = useAppSelector(s => s);
  const currentWallet = GetCurrentWallet(state);
  const currency = GetCurrencySelector(state);
  const assets = GetAssetsSelector(state, currentWallet);
  const fiatValue = GetTotalFiatValueSelector(state, currentWallet);
  const walletService = new WalletService(dispatch, currentWallet);

  const openCoin = function (asset: Asset) {
    navigation.navigate(Screen.COIN, {
      asset: asset,
    });
  };

  const headerAction = function (action: WalletHeaderAction) {
    switch (action) {
      case WalletHeaderAction.RECEIVE:
        // @ts-ignore
        navigation.navigate(ScreenNavigator.SELECT_ASSET, {
          screen: Screen.SELECT_ASSET,
          params: {type: SelectAssetType.RECEIVE},
        });
        break;
      case WalletHeaderAction.BUY:
        // @ts-ignore
        navigation.navigate(ScreenNavigator.SELECT_ASSET, {
          screen: Screen.SELECT_ASSET,
          params: {type: SelectAssetType.BUY},
        });
        break;
    }
  };

  const pullRefreshBalance = React.useCallback(() => {
    refreshBalance(currentWallet);
  }, []);

  const refreshBalance = React.useCallback((wallet: Wallet) => {
    console.log('refreshBalance: ', wallet);

    setRefreshing(true);

    walletService
      .refresh(currency)
      .catch(error => {
        console.log('wallet service error: ', error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    console.log('wallets changed to: ', currentWallet);
    refreshBalance(currentWallet);
  }, [currentWallet]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={assets}
        renderItem={({item}) => (
          <AssetListItem asset={item} onPress={() => openCoin(item.asset)} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={pullRefreshBalance}
            tintColor={Colors.GRAY}
          />
        }
        ListHeaderComponent={
          <WalletHeader fiatValue={fiatValue} onPress={headerAction} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
});
