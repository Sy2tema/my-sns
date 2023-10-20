import { isAxiosError } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { RequestAction, ApiResponse } from ".";
import { ADD_POST_SUCCESS, ADD_POST_FAILURE, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, LOAD_POST_SUCCESS, LOAD_POST_FAILURE, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE, ADD_POST_REQUEST, REMOVE_POST_REQUEST, LOAD_POST_REQUEST, ADD_COMMENT_REQUEST, UPLOAD_IMAGES_REQUEST } from "../../reducers/post/actionTypes";
import { ADD_POST_TO_CURRENT_USER, REMOVE_POST_FROM_CURRENT_USER, LIKE_POST_SUCCESS, LIKE_POST_FAILURE, DISLIKE_POST_SUCCESS, DISLIKE_POST_FAILURE, LIKE_POST_REQUEST, DISLIKE_POST_REQUEST } from "../../reducers/user/actionTypes";
import { addPostAPI, removePostAPI, loadPostAPI, likePostAPI, disLikePostAPI, addCommentAPI, uploadImagesAPI } from "./apis";

export function* addPost(action: RequestAction) {
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
                console.error("Axios error:", err);
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

export function* removePost(action: RequestAction) {
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
                console.error("Axios error:", err);
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

export function* loadPost(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(loadPostAPI, action.data);

        yield put({
            type: LOAD_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                console.error("Axios error:", err);
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

export function* likePost(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(likePostAPI, action.data);

        yield put({
            type: LIKE_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                console.error("Axios error:", err);
                yield put({
                    type: LIKE_POST_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: LIKE_POST_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: LIKE_POST_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

export function* disLikePost(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(disLikePostAPI, action.data);

        yield put({
            type: DISLIKE_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                console.error("Axios error:", err);
                yield put({
                    type: DISLIKE_POST_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: DISLIKE_POST_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: DISLIKE_POST_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

export function* addComment(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(addCommentAPI, action.data);

        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                console.error("Axios error:", err);
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

export function* uploadImages(action: RequestAction) {
    try {
        const result: ApiResponse = yield call(uploadImagesAPI, action.data);

        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        if (isAxiosError(err)) {
            if (err.response) {
                console.error("Axios error:", err);
                yield put({
                    type: UPLOAD_IMAGES_FAILURE,
                    error: err.response.data,
                });
            } else {
                // 서버 응답이 없는 경우의 처리
                console.error("No server response:", err);
                yield put({
                    type: UPLOAD_IMAGES_FAILURE,
                    error: "No server response."
                });
            }
        } else {
            // AxiosError가 아닌 다른 유형의 오류를 처리
            console.error("An unknown error occurred:", err);
            yield put({
                type: UPLOAD_IMAGES_FAILURE,
                error: "An unknown error occurred."
            });
        }
    }
}

export function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
export function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
export function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
export function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}
export function* watchDisLikePost() {
    yield takeLatest(DISLIKE_POST_REQUEST, disLikePost);
}
export function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
export function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}