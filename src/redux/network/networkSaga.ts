import axios from 'axios';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import testActions, { NETWORK_ACTIONS } from './networkActionCreator';

// Mock generator function
function* fetchMockItems(): Generator {
  try {
    yield put(testActions.setLoadingTrue());
    // mock fetch api item
    const mockItem: any = yield call(axios.get, 'https://jsonplaceholder.typicode.com/todos/1');
    yield put(testActions.fetchMockItemSuccess(mockItem.data.items));
    yield put(testActions.setLoadingFalse());
  } catch (e) {}
}

function* myTestSaga(): Generator {
  yield takeLatest(NETWORK_ACTIONS.FETCH_MOCK_ITEM_START, fetchMockItems); // get all items
}

export default myTestSaga;
