import axios, { AxiosError } from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
    LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
} from "../actions";
import { AnyAction } from "redux";

interface RequestData {
    email: string;
    username: string;
    password: string;
}

interface RequestAction extends AnyAction {
    data: RequestData;
}

interface ApiResponse {
    data: RequestData;
    status: number;
}

function isAxiosError(error: any): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}

function loadMyInfoAPI() {
    return axios.get('/user');
}

function* loadMyInfo(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(loadMyInfoAPI);

        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                yield put({
                    type: LOAD_MY_INFO_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: LOAD_MY_INFO_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: LOAD_MY_INFO_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}
function loginAPI(data: RequestData) {
    return axios.post('/user/login', data);
}

function* login(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(loginAPI, action.data);

        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                yield put({
                    type: LOG_IN_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: LOG_IN_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: LOG_IN_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

function logoutAPI() {
    return axios.post('/user/logout');
}

function* logout() {
    try {
        yield call(logoutAPI);

        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                yield put({
                    type: LOG_OUT_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: LOG_OUT_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: LOG_OUT_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

function signupAPI(data: RequestData) {
    return axios.post('/user', data);
}

function* signup(action: RequestAction) {
    try {
        yield call(signupAPI, action.data);

        yield put({
            type: SIGN_UP_SUCCESS,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                yield put({
                    type: SIGN_UP_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: SIGN_UP_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: SIGN_UP_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

function followAPI(data: RequestData) {
    return axios.post('/user/follow');
}

function* follow(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(followAPI, action.data);

        yield put({
            type: FOLLOW_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                yield put({
                    type: FOLLOW_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: FOLLOW_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: FOLLOW_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

function unfollowAPI(data: RequestData) {
    return axios.post('/user/unfollow');
}

function* unfollow(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(unfollowAPI, action.data);

        yield put({
            type: UNFOLLOW_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                yield put({
                    type: UNFOLLOW_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: UNFOLLOW_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: UNFOLLOW_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
}
function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout);
}
function* watchSignup() {
    yield takeLatest(SIGN_UP_REQUEST, signup);
}
function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
    yield all([
        fork(watchLoadMyInfo),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchFollow),
        fork(watchUnfollow),
    ])
}