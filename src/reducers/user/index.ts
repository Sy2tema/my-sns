import { Draft, produce } from "immer";
import {
    ADD_POST_TO_CURRENT_USER,
    CHANGE_NICKNAME_FAILURE, CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS,
    FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS,
    LOAD_FOLLOWERS_FAILURE, LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE, LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS,
    LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
    LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
    LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS,
    REMOVE_FOLLOWER_FAILURE, REMOVE_FOLLOWER_REQUEST,
    REMOVE_FOLLOWER_SUCCESS, REMOVE_POST_FROM_CURRENT_USER,
    SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS,
    UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS
} from "./actionTypes";
import { IdData, UserAction, UserData, UserState } from "./types";

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