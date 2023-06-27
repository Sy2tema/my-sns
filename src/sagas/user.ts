import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";

function loginAPI(data) {
    return axios.post('/api/login', data);
}

function* login(action) {
    try {
        // const result = yield call(loginAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.data,
        });
    } catch (error) {
        yield put({
            type: 'LOG_IN_FAILURE',
            data: error.response.data,
        })
    }
}

function logoutAPI() {
    return axios.post('/api/logout');
}

function* logout() {
    try {
        // const result = yield call(logoutAPI);
        yield delay(1000);
        yield put({
            type: 'LOG_OUT_SUCCESS',
        });
    } catch (error) {
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: error.response.data,
        })
    }
}

function* watchLogin() {
    yield takeLatest('LOG_IN_REQUEST', login);
}

function* watchLogout() {
    yield takeLatest('LOG_OUT_REQUEST', logout);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
    ])
}