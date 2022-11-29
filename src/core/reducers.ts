import {combineReducers} from 'redux';

import wallets from './reducers/wallets';
import settings from './reducers/settings';
import assets from './reducers/assets';

export default combineReducers({
  wallets,
  settings,
  assets,
});
