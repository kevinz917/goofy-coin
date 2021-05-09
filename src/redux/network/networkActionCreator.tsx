import { Action } from '../../common/types/Action';
import actionCreator from '../actionCreator';

export const NETWORK_ACTIONS = {
  SET_LOADING_TRUE: 'SET_LOADING_TRUE',
  SET_LOADING_FALSE: 'SET_LOADING_FALSE',

  FETCH_MOCK_ITEM_START: 'START_FETCH_MOCK_ITEM',
  FETCH_MOCK_ITEM_SUCCESS: 'FETCH_MOCK_ITEM_SUCCESS',

  SET_TOKEN_SALE_CONTRACT: 'SET_TOKEN_SALE_CONTRACT',
  SET_TOKEN_CONTRACT: 'SET_TOKEN_CONTRACT',

  SET_IMAGES: 'SET_IMAGES',

  SET_ACCOUNT: 'SET_ACCOUNT',
};

export default {
  setLoadingTrue(): Action {
    return actionCreator(NETWORK_ACTIONS.SET_LOADING_TRUE);
  },
  setLoadingFalse(): Action {
    return actionCreator(NETWORK_ACTIONS.SET_LOADING_FALSE);
  },
  fetchMockItem(): Action {
    return actionCreator(NETWORK_ACTIONS.FETCH_MOCK_ITEM_START);
  },
  fetchMockItemSuccess(item: any): Action {
    return actionCreator(NETWORK_ACTIONS.FETCH_MOCK_ITEM_SUCCESS, { item });
  },

  // Contracts
  setTokenSaleContract(contract: any): Action {
    return actionCreator(NETWORK_ACTIONS.SET_TOKEN_SALE_CONTRACT, { contract });
  },
  setTokenContract(contract: any): any {
    return actionCreator(NETWORK_ACTIONS.SET_TOKEN_CONTRACT, { contract });
  },

  setImages(images: any[]): Action {
    return actionCreator(NETWORK_ACTIONS.SET_IMAGES, { images });
  },
  setAccount(account: any): Action {
    return actionCreator(NETWORK_ACTIONS.SET_ACCOUNT, { account });
  },
};
