import {
    LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
    ADD_POST_TO_CURRENT_USER, REMOVE_POST_FROM_CURRENT_USER,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
    LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE,
    REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE,
} from "../actions";
import { produce, Draft } from "immer";
import { PostData } from "./post";

interface UserState {
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

interface LoginData {
    email: string;
    password: string;
}

type UserAction = LoadMyInfoRequestAction | LoadMyInfoSuccessAction | LoadMyInfoFailureAction
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

interface LoadMyInfoRequestAction {
    type: typeof LOAD_MY_INFO_REQUEST,
    data: UserState,
}
interface LoadMyInfoSuccessAction {
    type: typeof LOAD_MY_INFO_SUCCESS,
    data: UserData,
}
interface LoadMyInfoFailureAction {
    type: typeof LOAD_MY_INFO_FAILURE,
    error: string,
}
interface LoginRequestAction {
    type: typeof LOG_IN_REQUEST,
    data: LoginData,
}
interface LoginSuccessAction {
    type: typeof LOG_IN_SUCCESS,
    data: UserData,
}
interface LoginFailureAction {
    type: typeof LOG_IN_FAILURE,
    error: string,
}
interface LogoutRequestAction {
    type: typeof LOG_OUT_REQUEST,
}
interface LogoutSuccessAction {
    type: typeof LOG_OUT_SUCCESS,
}
interface LogoutFailureAction {
    type: typeof LOG_OUT_FAILURE,
    error: string,
}
interface SignupRequestAction {
    type: typeof SIGN_UP_REQUEST,
}
interface SignupSuccessAction {
    type: typeof SIGN_UP_SUCCESS,
}
interface SignupFailureAction {
    type: typeof SIGN_UP_FAILURE,
    error: string,
}
interface ChangeNicknameRequestAction {
    type: typeof CHANGE_NICKNAME_REQUEST,
    data: UserState,
}
interface ChangeNicknameSuccessAction {
    type: typeof CHANGE_NICKNAME_SUCCESS,
    data: UserData,
}
interface ChangeNicknameFailureAction {
    type: typeof CHANGE_NICKNAME_FAILURE,
    error: string,
}
interface FollowRequestAction {
    type: typeof FOLLOW_REQUEST,
    data: UserState,
}
interface FollowSuccessAction {
    type: typeof FOLLOW_SUCCESS,
    data: { UserId: number },
}
interface FollowFailureAction {
    type: typeof FOLLOW_FAILURE,
    error: string,
}
interface UnfollowRequestAction {
    type: typeof UNFOLLOW_REQUEST,
    data: UserState,
}
interface UnfollowSuccessAction {
    type: typeof UNFOLLOW_SUCCESS,
    data: { UserId: number },
}
interface UnfollowFailureAction {
    type: typeof UNFOLLOW_FAILURE,
    error: string,
}
interface RemoveFollowerRequestAction {
    type: typeof REMOVE_FOLLOWER_REQUEST,
    data: UserState,
}
interface RemoveFollowerSuccessAction {
    type: typeof REMOVE_FOLLOWER_SUCCESS,
    data: { UserId: number },
}
interface RemoveFollowerFailureAction {
    type: typeof REMOVE_FOLLOWER_FAILURE,
    error: string,
}
interface LoadFollowersRequestAction {
    type: typeof LOAD_FOLLOWERS_REQUEST,
    data: UserState,
}
interface LoadFollowersSuccessAction {
    type: typeof LOAD_FOLLOWERS_SUCCESS,
    data: UserState,
}
interface LoadFollowersFailureAction {
    type: typeof LOAD_FOLLOWERS_FAILURE,
    error: string,
}
interface LoadFollowingsRequestAction {
    type: typeof LOAD_FOLLOWINGS_REQUEST,
    data: UserState,
}
interface LoadFollowingsSuccessAction {
    type: typeof LOAD_FOLLOWINGS_SUCCESS,
    data: UserState,
}
interface LoadFollowingsFailureAction {
    type: typeof LOAD_FOLLOWINGS_FAILURE,
    error: string,
}
interface AddPostToCurrentUserAction {
    type: typeof ADD_POST_TO_CURRENT_USER,
    data: number,
}
interface RemovePostFromCurrentUserAction {
    type: typeof REMOVE_POST_FROM_CURRENT_USER,
    data: number,
}

const initialState: UserState = {
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: null,
    loginLoading: false,
    loginDone: false,
    loginError: null,
    logoutLoading: false,
    logoutDone: false,
    logoutError: null,
    signupLoading: false,
    signupDone: false,
    signupError: null,
    changeNicknameLoading: false,
    changeNicknameDone: false,
    changeNicknameError: null,
    followLoading: false,
    followDone: false,
    followError: null,
    unfollowLoading: false,
    unfollowDone: false,
    unfollowError: null,
    removeFollowerLoading: false,
    removeFollowerDone: false,
    removeFollowerError: null,
    loadFollowersLoading: false,
    loadFollowersDone: false,
    loadFollowersError: null,
    loadFollowingsLoading: false,
    loadFollowingsDone: false,
    loadFollowingsError: null,
    ownUser: null,
    signUpData: {},
    loginData: {},
};

// action creator
export const loginRequestAction = (data: LoginData): LoginRequestAction => {
    return {
        type: LOG_IN_REQUEST,
        data,
    }
};

export const logoutRequestAction = (): LogoutRequestAction => {
    return {
        type: LOG_OUT_REQUEST,
    }
};

const reducer = (state = initialState, action: UserAction): UserState => {
    return produce(state, (draft: Draft<UserState>) => {
        switch (action.type) {
            case LOAD_MY_INFO_REQUEST:
                draft.loadMyInfoLoading = true;
                draft.loadMyInfoError = null;
                draft.loadMyInfoDone = false;
                break;
            case LOAD_MY_INFO_SUCCESS:
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoDone = true;
                draft.ownUser = action.data;
                break;
            case LOAD_MY_INFO_FAILURE:
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoError = action.error;
                break;
            case LOG_IN_REQUEST:
                draft.loginLoading = true;
                draft.loginError = null;
                draft.loginDone = false;
                break;
            case LOG_IN_SUCCESS:
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.ownUser = action.data;
                break;
            case LOG_IN_FAILURE:
                draft.loginLoading = false;
                draft.loginError = action.error;
                break;
            case LOG_OUT_REQUEST:
                draft.logoutLoading = true;
                draft.logoutError = null;
                draft.logoutDone = false;
                break;
            case LOG_OUT_SUCCESS:
                draft.logoutLoading = false;
                draft.logoutDone = true;
                draft.ownUser = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logoutLoading = false;
                draft.logoutError = action.error;
                break;
            case SIGN_UP_REQUEST:
                draft.signupLoading = true;
                draft.signupError = null;
                draft.signupDone = false;
                break;
            case SIGN_UP_SUCCESS:
                draft.signupLoading = false;
                draft.signupDone = true;
                draft.ownUser = null;
                break;
            case SIGN_UP_FAILURE:
                draft.signupLoading = false;
                draft.signupError = action.error;
                break;
            case CHANGE_NICKNAME_REQUEST:
                draft.changeNicknameLoading = true;
                draft.changeNicknameError = null;
                draft.changeNicknameDone = false;
                break;
            case CHANGE_NICKNAME_SUCCESS:
                draft.changeNicknameDone = true;
                draft.changeNicknameLoading = false;
                if (draft.ownUser) {
                    draft.ownUser.nickname = action.data.nickname;
                }
                break;
            case CHANGE_NICKNAME_FAILURE:
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
                break;
            case FOLLOW_REQUEST:
                draft.followLoading = true;
                draft.followError = null;
                draft.followDone = false;
                break;
            case FOLLOW_SUCCESS:
                draft.followDone = true;
                draft.followLoading = false;
                draft.ownUser?.Followings.push({ id: action.data.UserId } as IdData);
                break;
            case FOLLOW_FAILURE:
                draft.followLoading = false;
                draft.followError = action.error;
                break;
            case UNFOLLOW_REQUEST:
                draft.unfollowLoading = true;
                draft.unfollowError = null;
                draft.unfollowDone = false;
                break;
            case UNFOLLOW_SUCCESS:
                draft.unfollowDone = true;
                draft.unfollowLoading = false;
                if (draft.ownUser) {
                    draft.ownUser.Followings = draft.ownUser.Followings?.filter((value) => Number(value.id) !== action.data.UserId);
                }
                break;
            case UNFOLLOW_FAILURE:
                draft.removeFollowerLoading = false;
                draft.removeFollowerError = action.error;
                break;
            case REMOVE_FOLLOWER_REQUEST:
                draft.removeFollowerLoading = true;
                draft.removeFollowerError = null;
                draft.removeFollowerDone = false;
                break;
            case REMOVE_FOLLOWER_SUCCESS:
                draft.removeFollowerDone = true;
                draft.removeFollowerLoading = false;
                if (draft.ownUser) {
                    console.log(action);
                    draft.ownUser.Followers = draft.ownUser.Followers?.filter((value) => Number(value.id) !== action.data.UserId);
                }
                break;
            case REMOVE_FOLLOWER_FAILURE:
                draft.unfollowLoading = false;
                draft.unfollowError = action.error;
                break;
            case LOAD_FOLLOWERS_REQUEST:
                draft.loadFollowersLoading = true;
                draft.loadFollowersError = null;
                draft.loadFollowersDone = false;
                break;
            case LOAD_FOLLOWERS_SUCCESS:
                draft.loadFollowersDone = true;
                draft.loadFollowersLoading = false;
                if (draft.ownUser) {
                    draft.ownUser.Followers = action.data as unknown as (UserData | IdData)[];
                }
                break;
            case LOAD_FOLLOWERS_FAILURE:
                draft.loadFollowersLoading = false;
                draft.loadFollowersError = action.error;
                break;
            case LOAD_FOLLOWINGS_REQUEST:
                draft.loadFollowingsLoading = true;
                draft.loadFollowingsError = null;
                draft.loadFollowingsDone = false;
                break;
            case LOAD_FOLLOWINGS_SUCCESS:
                draft.loadFollowingsDone = true;
                draft.loadFollowingsLoading = false;
                if (draft.ownUser) {
                    draft.ownUser.Followings = action.data as unknown as (UserData | IdData)[];
                }
                break;
            case LOAD_FOLLOWINGS_FAILURE:
                draft.loadFollowingsLoading = false;
                draft.loadFollowingsError = action.error;
                break;
            case ADD_POST_TO_CURRENT_USER:
                if (draft.ownUser) {
                    draft.ownUser.Posts?.unshift({ id: action.data });
                }
                break;
            case REMOVE_POST_FROM_CURRENT_USER:
                if (draft.ownUser) {
                    draft.ownUser.Posts = draft.ownUser.Posts?.filter((value) => (value.id) !== action.data);
                }
                break;
            default:
                break;
        }
    });
};

export default reducer;