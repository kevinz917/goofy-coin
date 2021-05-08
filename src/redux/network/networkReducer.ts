import { produce } from 'immer';
import { NETWORK_ACTIONS } from './networkActionCreator';

const initialTestState = {
  global: {
    loading: false,
  },
  account: null,
  loading: false,
  contracts: {
    tokenSale: null,
  },
  images: [],
};

// test reducer for demo purposes
export const networkReducer = produce((state, action) => {
  switch (action.type) {
    case NETWORK_ACTIONS.SET_LOADING_TRUE:
      state.loading = true;
      break;
    case NETWORK_ACTIONS.SET_LOADING_FALSE:
      state.loading = false;
      break;
    case NETWORK_ACTIONS.SET_ACCOUNT:
      state.account = action.payload.account;
      break;

    // Set contract
    case NETWORK_ACTIONS.SET_TOKEN_SALE_CONTRACT:
      state.contracts.tokenSale = action.payload.contract;
      break;
    case NETWORK_ACTIONS.SET_IMAGES:
      state.images = action.payload.images;
      break;
    default:
      break;
  }
}, initialTestState);
