import { all } from "axios";
import { AnyAction } from "redux";
import { fork } from "redux-saga/effects";
import { watchAddPost, watchRemovePost, watchLoadPost, watchLikePost, watchDisLikePost, watchAddComment, watchUploadImages } from "./sagas";

export interface RequestData {
    postId?: number;
    userId?: number;
    id: number;
}

export interface RequestAction extends AnyAction {
    data: RequestData;
}

export interface ApiResponse {
    data: RequestData;
    status: number;
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchLoadPost),
        fork(watchLikePost),
        fork(watchDisLikePost),
        fork(watchAddComment),
        fork(watchUploadImages),
    ]);
}