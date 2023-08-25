import axios, { AxiosError } from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE
} from "../actions";
import { AnyAction } from "redux";

interface RequestData {
    email: string;
    username: string;
    password: string;
}

interface SignupAction extends AnyAction {
    data: RequestData;
}

interface LoginAction extends AnyAction {
    data: RequestData;
}

interface ApiResponse {
    data: RequestData;
    status: number;
}

function isAxiosError(error: any): error is AxiosError {
    return (error as AxiosError).isAxiosError !== undefined;
}

function loginAPI(data: LoginAction) {
    return axios.post('/user/login', data);
}

function* login(action: LoginAction) {
    try {
        const result: ApiResponse = yield call(loginAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        })
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
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        })
    }
}

function signupAPI(data: SignupAction) {
    return axios.post('/user', data);
}

function* signup(action: SignupAction) {
    try {
        const result: ApiResponse = yield call(signupAPI, action.data);

        yield put({
            type: SIGN_UP_SUCCESS,
        });
    } catch (err) {
        if (isAxiosError(err) && err.response) {
            yield put({
                type: SIGN_UP_FAILURE,
                error: err.response.data,
            })
        } else if (isAxiosError(err)) {
            // Axios 오류지만 response가 없는 경우 (예: 네트워크 에러)
            yield put({
                type: SIGN_UP_FAILURE,
                error: "네트워크 오류 또는 서버에서 응답이 없는 오류입니다.",
            });
        } else {
            // axios가 아닌 다른에러케이스
            yield put({
                type: SIGN_UP_FAILURE,
                error: err.response.data,
            })
        }
    }
}

function followAPI() {
    return axios.post('/follow');
}

function* follow(action) {
    try {
        // const result = yield call(followAPI);
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        })
    }
}

function unfollowAPI() {
    return axios.post('/unfollow');
}

function* unfollow(action) {
    try {
        // const result = yield call(unfollowAPI);
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        })
    }
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
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchFollow),
        fork(watchUnfollow),
    ])
}