import {AppState} from '../../core/store';
import {createSelector} from '@reduxjs/toolkit';
import {Chain} from '@magicwallet/chain-types';
import {Wallet} from '@magicwallet/types';

const getWallets = (state: AppState) => state.wallets || {};
const getWalletAccount = (
  state: AppState,
  value: {wallet: Wallet; chain: Chain},
) => {
  return value;
};

export const GetCurrentWallet = createSelector(
  (state: AppState) => state.wallets,
  wallets => {
    return wallets.wallets.find(wallet => wallet.id === wallets.current)!;
  },
);

export const GetCurrentWalletAccount = createSelector(
  getWalletAccount,
  value => {
    return value.wallet.accounts.find(
      account => account.chain === value.chain,
    )!;
  },
);
