import { combineReducers } from 'redux';
import { networkReducer } from './network/networkReducer';

const rootReducer = combineReducers({
  network: networkReducer,
});

export default rootReducer;
