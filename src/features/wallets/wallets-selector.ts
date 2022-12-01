import {createSelector} from '@reduxjs/toolkit';
import {Wallet} from '@magicwallet/types';
import {AppState} from '../../core/store';
import {AssetResource} from '../../assets/asset-resource';

export const walletListSelector = createSelector(
  (wallet: Wallet) => wallet,
  wallet => {
    return {
      name: wallet.name,
      // name: `${wallet.name} (${wallet.address.substring(
      //   0,
      //   6,
      // )}...${wallet.address.substring(
      //   wallet.address.length,
      //   wallet.address.length - 6,
      // )})`,
      wallet: wallet,
    };
  },
);

export const getWalletsSelector = createSelector(
  (state: AppState) => state.wallets.wallets,
  items => {
    return items.map(item => {
      return walletListSelector(item);
    });
  },
);

export const walletName = (assetResource: AssetResource, numberOfWallets: number): string => {
  return `${assetResource.name} Wallet #${numberOfWallets + 1}`;
};
