import {
    LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
    REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE,
    LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE,
    ADD_POST_TO_CURRENT_USER, REMOVE_POST_FROM_CURRENT_USER
} from "./actionTypes";
import { PostData } from "../post/types";


export interface UserState {
    loadMyInfoLoading: boolean;
    loadMyInfoDone: boolean;
    loadMyInfoError: boolean | string | null;
    loginLoading: boolean;
    loginDone: boolean;
    loginError: boolean | string | null;
    logoutLoading: boolean;
    logoutDone: boolean;
    logoutError: boolean | string | null;
    signupLoading: boolean;
    signupDone: boolean;
    signupError: boolean | string | null;
    changeNicknameLoading: boolean;
    changeNicknameDone: boolean;
    changeNicknameError: boolean | string | null;
    followLoading: boolean;
    followDone: boolean;
    followError: boolean | string | null;
    unfollowLoading: boolean;
    unfollowDone: boolean;
    unfollowError: boolean | string | null;
    removeFollowerLoading: boolean;
    removeFollowerDone: boolean;
    removeFollowerError: boolean | string | null;
    loadFollowersLoading: boolean;
    loadFollowersDone: boolean;
    loadFollowersError: boolean | string | null;
    loadFollowingsLoading: boolean;
    loadFollowingsDone: boolean;
    loadFollowingsError: boolean | string | null;
    ownUser: UserData | null;
    signUpData: {};
    loginData: {};
}

export interface UserData {
    nickname: string;
    id: number;
    Posts: (IdData | PostData)[];
    Followings: (IdData | UserData)[];
    Followers: (IdData | UserData)[];
}

export interface IdData {
    id: number;
    nickname?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export type UserAction = LoadMyInfoRequestAction | LoadMyInfoSuccessAction | LoadMyInfoFailureAction
    | LoginRequestAction | LoginSuccessAction | LoginFailureAction
    | LogoutRequestAction | LogoutSuccessAction | LogoutFailureAction
    | SignupRequestAction | SignupSuccessAction | SignupFailureAction
    | ChangeNicknameRequestAction | ChangeNicknameSuccessAction | ChangeNicknameFailureAction
    | FollowRequestAction | FollowSuccessAction | FollowFailureAction
    | UnfollowRequestAction | UnfollowSuccessAction | UnfollowFailureAction
    | RemoveFollowerRequestAction | RemoveFollowerSuccessAction | RemoveFollowerFailureAction
    | LoadFollowersRequestAction | LoadFollowersSuccessAction | LoadFollowersFailureAction
    | LoadFollowingsRequestAction | LoadFollowingsSuccessAction | LoadFollowingsFailureAction
    | AddPostToCurrentUserAction | RemovePostFromCurrentUserAction;

export interface LoadMyInfoRequestAction {
    type: typeof LOAD_MY_INFO_REQUEST,
    data: UserState,
}
export interface LoadMyInfoSuccessAction {
    type: typeof LOAD_MY_INFO_SUCCESS,
    data: UserData,
}
export interface LoadMyInfoFailureAction {
    type: typeof LOAD_MY_INFO_FAILURE,
    error: string,
}
export interface LoginRequestAction {
    type: typeof LOG_IN_REQUEST,
    data: LoginData,
}
export interface LoginSuccessAction {
    type: typeof LOG_IN_SUCCESS,
    data: UserData,
}
export interface LoginFailureAction {
    type: typeof LOG_IN_FAILURE,
    error: string,
}
export interface LogoutRequestAction {
    type: typeof LOG_OUT_REQUEST,
}
export interface LogoutSuccessAction {
    type: typeof LOG_OUT_SUCCESS,
}
export interface LogoutFailureAction {
    type: typeof LOG_OUT_FAILURE,
    error: string,
}
export interface SignupRequestAction {
    type: typeof SIGN_UP_REQUEST,
}
export interface SignupSuccessAction {
    type: typeof SIGN_UP_SUCCESS,
}
export interface SignupFailureAction {
    type: typeof SIGN_UP_FAILURE,
    error: string,
}
export interface ChangeNicknameRequestAction {
    type: typeof CHANGE_NICKNAME_REQUEST,
    data: UserState,
}
export interface ChangeNicknameSuccessAction {
    type: typeof CHANGE_NICKNAME_SUCCESS,
    data: UserData,
}
export interface ChangeNicknameFailureAction {
    type: typeof CHANGE_NICKNAME_FAILURE,
    error: string,
}
export interface FollowRequestAction {
    type: typeof FOLLOW_REQUEST,
    data: UserState,
}
export interface FollowSuccessAction {
    type: typeof FOLLOW_SUCCESS,
    data: { UserId: number },
}
export interface FollowFailureAction {
    type: typeof FOLLOW_FAILURE,
    error: string,
}
export interface UnfollowRequestAction {
    type: typeof UNFOLLOW_REQUEST,
    data: UserState,
}
export interface UnfollowSuccessAction {
    type: typeof UNFOLLOW_SUCCESS,
    data: { UserId: number },
}
export interface UnfollowFailureAction {
    type: typeof UNFOLLOW_FAILURE,
    error: string,
}
export interface RemoveFollowerRequestAction {
    type: typeof REMOVE_FOLLOWER_REQUEST,
    data: UserState,
}
export interface RemoveFollowerSuccessAction {
    type: typeof REMOVE_FOLLOWER_SUCCESS,
    data: { UserId: number },
}
export interface RemoveFollowerFailureAction {
    type: typeof REMOVE_FOLLOWER_FAILURE,
    error: string,
}
export interface LoadFollowersRequestAction {
    type: typeof LOAD_FOLLOWERS_REQUEST,
    data: UserState,
}
export interface LoadFollowersSuccessAction {
    type: typeof LOAD_FOLLOWERS_SUCCESS,
    data: UserState,
}
export interface LoadFollowersFailureAction {
    type: typeof LOAD_FOLLOWERS_FAILURE,
    error: string,
}
export interface LoadFollowingsRequestAction {
    type: typeof LOAD_FOLLOWINGS_REQUEST,
    data: UserState,
}
export interface LoadFollowingsSuccessAction {
    type: typeof LOAD_FOLLOWINGS_SUCCESS,
    data: UserState,
}
export interface LoadFollowingsFailureAction {
    type: typeof LOAD_FOLLOWINGS_FAILURE,
    error: string,
}
export interface AddPostToCurrentUserAction {
    type: typeof ADD_POST_TO_CURRENT_USER,
    data: number,
}
export interface RemovePostFromCurrentUserAction {
    type: typeof REMOVE_POST_FROM_CURRENT_USER,
    data: number,
}