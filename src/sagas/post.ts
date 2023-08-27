import axios, { isAxiosError } from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    ADD_POST_TO_CURRENT_USER, REMOVE_POST_FROM_CURRENT_USER,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE
} from "../actions";
import { AnyAction } from "redux";

interface RequestData {
    postId?: number;
    id: number;
    // @Todo: RequestData에 넣어줄 속성들 지정해주기
}

interface RequestAction extends AnyAction {
    data: RequestData;
}

interface ApiResponse {
    data: RequestData;
    status: number;
}

function addPostAPI(data: RequestData) {
    return axios.post('/post', { content: data });
}

function* addPost(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(addPostAPI, action.data);

        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_CURRENT_USER,
            data: result.data.id,
        })
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                yield put({
                    type: ADD_POST_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: ADD_POST_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: ADD_POST_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

function removePostAPI(data: RequestData) {
    return axios.delete('/post', data);
}

function* removePost(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(removePostAPI, action.data);

        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: REMOVE_POST_FROM_CURRENT_USER,
            data: result.data,
        })
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                yield put({
                    type: REMOVE_POST_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: REMOVE_POST_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: REMOVE_POST_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

function loadPostAPI(data: RequestData) {
    return axios.get('/post', data);
}

function* loadPost(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(loadPostAPI, action.data);

        yield put({
            type: LOAD_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                yield put({
                    type: LOAD_POST_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: LOAD_POST_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: LOAD_POST_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

function addCommentAPI(data: RequestData) {
    return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(addCommentAPI, action.data);

        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                yield put({
                    type: ADD_COMMENT_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: ADD_COMMENT_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: ADD_COMMENT_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchLoadPost),
        fork(watchAddComment),
    ]);
}