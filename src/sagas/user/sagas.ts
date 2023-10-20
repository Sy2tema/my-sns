import { isAxiosError } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, FOLLOW_SUCCESS, FOLLOW_FAILURE, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE, LOAD_MY_INFO_REQUEST, LOG_IN_REQUEST, LOG_OUT_REQUEST, SIGN_UP_REQUEST, FOLLOW_REQUEST, UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST, LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, CHANGE_NICKNAME_REQUEST } from "../../reducers/user/actionTypes";
import { loadMyInfoAPI, loginAPI, logoutAPI, signupAPI, followAPI, unfollowAPI, removeFollowerAPI, loadFollowersAPI, loadFollowingsAPI, changeNicknameAPI } from "./apis";
import { ApiResponse, RequestAction } from ".";

export function* loadMyInfo(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(loadMyInfoAPI);

        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                console.error("Axios error:", err);
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

export function* login(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(loginAPI, action.data);

        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                console.error("Axios error:", err);
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

export function* logout() {
    try {
        yield call(logoutAPI);

        yield put({
            type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                console.error("Axios error:", err);
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

export function* signup(action: RequestAction) {
    try {
        yield call(signupAPI, action.data);

        yield put({
            type: SIGN_UP_SUCCESS,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                console.error("Axios error:", err);
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

export function* follow(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(followAPI, action.data);

        yield put({
            type: FOLLOW_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                console.error("Axios error:", err);
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

export function* unfollow(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(unfollowAPI, action.data);

        yield put({
            type: UNFOLLOW_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            console.error("Axios error:", err);
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

export function* removeFollower(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(removeFollowerAPI, action.data);

        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            console.error("Axios error:", err);
            if (err.response) {
                yield put({
                    type: REMOVE_FOLLOWER_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: REMOVE_FOLLOWER_FAILURE,
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

export function* loadFollowers(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(loadFollowersAPI, action.data);

        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            console.error("Axios error:", err);
            if (err.response) {
                yield put({
                    type: LOAD_FOLLOWERS_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: LOAD_FOLLOWERS_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: LOAD_FOLLOWERS_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

export function* loadFollowings(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(loadFollowingsAPI, action.data);

        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            console.error("Axios error:", err);
            if (err.response) {
                yield put({
                    type: LOAD_FOLLOWINGS_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: LOAD_FOLLOWINGS_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: LOAD_FOLLOWINGS_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

export function* changeNickname(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(changeNicknameAPI, action.data);

        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            console.error("Axios error:", err);
            if (err.response) {
                yield put({
                    type: CHANGE_NICKNAME_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: CHANGE_NICKNAME_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: CHANGE_NICKNAME_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

export function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
export function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
}
export function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout);
}
export function* watchSignup() {
    yield takeLatest(SIGN_UP_REQUEST, signup);
}
export function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}
export function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}
export function* watchRemoveFollower() {
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}
export function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
export function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
export function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}
