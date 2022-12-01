import {Dispatch} from 'redux';
import {Chain} from '@magicwallet/chain-types';
import {WalletType} from '@magicwallet/types';

type AddNewWallet = {
  name: string;
  type: WalletType;
  accounts: [Account];
};

type Account = {
  chain: Chain;
  address: string;
};

type Wallet = {
  id: string;
  name: string;
  type: WalletType;
  accounts: [Account];
};

interface WalletsState {
  current: string;
  current_index: number;
  wallets: Wallet[];
}

const INITIAL_STATE: WalletsState = {
  current: '',
  current_index: 1,
  wallets: [],
};

enum ACTION {
  ADD_WALLET = 'wallets.add',
  SELECT_WALLET = 'wallets.select',
  DELETE_WALLET = 'wallets.delete',
}

interface WalletsStateAddAWallet {
  type: typeof ACTION.ADD_WALLET;
  payload: AddNewWallet;
}

interface WalletsStateDeleteWallet {
  type: typeof ACTION.DELETE_WALLET;
  payload: Wallet;
}

interface WalletsStateSelectWallet {
  type: typeof ACTION.SELECT_WALLET;
  payload: Wallet;
}

type WalletsStateUpdateAction = WalletsStateAddAWallet | WalletsStateDeleteWallet | WalletsStateSelectWallet;

export const walletsAddWallet =
  (name: string, chain: Chain, address: string) => async (dispatch: Dispatch<WalletsStateAddAWallet>) => {
    return dispatch({
      type: ACTION.ADD_WALLET,
      payload: {
        name,
        type: WalletType.SINGLE,
        accounts: [{chain: chain, address: address}],
      },
    });
  };

export const walletsDeleteWallet = (wallet: Wallet) => async (dispatch: Dispatch<WalletsStateDeleteWallet>) => {
  return dispatch({
    type: ACTION.DELETE_WALLET,
    payload: wallet,
  });
};

export const walletsSelectWallet = (wallet: Wallet) => async (dispatch: Dispatch<WalletsStateSelectWallet>) => {
  return dispatch({
    type: ACTION.SELECT_WALLET,
    payload: wallet,
  });
};

export default (state = INITIAL_STATE, action: WalletsStateUpdateAction) => {
  switch (action.type) {
    case ACTION.ADD_WALLET: {
      const new_current_index = state.current_index + 1;
      const wallet = {
        id: new_current_index.toString(),
        type: action.payload.type,
        name: action.payload.name,
        accounts: action.payload.accounts,
      };
      return {
        ...state,
        current: wallet.id,
        current_index: new_current_index,
        wallets: [...state.wallets, wallet],
      };
    }
    case ACTION.SELECT_WALLET: {
      return {
        ...state,
        current: action.payload.id,
      };
    }
    case ACTION.DELETE_WALLET: {
      return {
        ...state,
        wallets: [...state.wallets.filter(el => el.id !== action.payload.id)],
      };
    }
    default:
      return state;
  }
};
