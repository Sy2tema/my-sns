import { all } from "axios";
import { AnyAction } from "redux";
import { fork } from "redux-saga/effects";
import { watchLoadMyInfo, watchLogin, watchLogout, watchSignup, watchFollow, watchUnfollow, watchRemoveFollower, watchLoadFollowers, watchLoadFollowings, watchChangeNickname } from "./sagas";

export interface RequestData {
    email: string;
    username: string;
    password: string;
    nickname?: string;
}

export interface RequestAction extends AnyAction {
    data: RequestData;
}

export interface ApiResponse {
    data: RequestData;
    status: number;
}

export default function* userSaga() {
    yield all([
        fork(watchLoadMyInfo),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchRemoveFollower),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchChangeNickname),
    ])
}