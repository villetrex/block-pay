import { put, takeLatest } from "redux-saga/effects";

import * as actions from "src/providers/store/actions";
import * as slicesActions from "src/providers/store/slices";

// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
// import {getCatsSuccess} = './catState'
// // takeEvery watches an action and triggers a function whenever that action is beiing called
// // yield is similar to async await

// function* workGetCatsFetch() {
//   const cats = yield call(() => fetch());
// }
// function* cats() {
//   lets cats = yield takeEvery("cats/getCatsFetch", workGetCatsFetch);
//   cats = yield cats.json();

//   yield put(getCatsSuccess(cats))
// }

function* updateUser(action: ReturnType<typeof actions.updateUser>) {
  const { payload } = action;

  yield put(slicesActions.setUser(payload));
}

export function* watchCommonSaga() {
  yield takeLatest(actions.updateUser.type, updateUser);
}
