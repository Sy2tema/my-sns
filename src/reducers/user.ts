import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
    ADD_POST_TO_CURRENT_USER, REMOVE_POST_FROM_CURRENT_USER, FOLLOW_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS
} from "../actions";
import { produce, Draft } from "immer";

interface User {
    nickname: string;
    id: string;
    Posts: Array<{ id: string }>;
    Followings: Array<{ id: string }>;
    Followers: Array<{ id: string }>;
}

interface UserState {
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
    ownUser: User | null;
    signUpData: {};
    loginData: {};
}

type UserAction = LoginRequestAction | LoginSuccessAction | LoginFailureAction
    | LogoutRequestAction | LogoutSuccessAction | LogoutFailureAction
    | SignupRequestAction | SignupSuccessAction | SignupFailureAction
    | ChangeNicknameRequestAction | ChangeNicknameSuccessAction | ChangeNicknameFailureAction
    | FollowRequestAction | FollowSuccessAction | FollowFailureAction
    | UnfollowRequestAction | UnfollowSuccessAction | UnfollowFailureAction
    | AddPostToCurrentUserAction | RemovePostFromCurrentUserAction;

interface LoginRequestAction {
    type: typeof LOG_IN_REQUEST,
    data: UserState,
}
interface LoginSuccessAction {
    type: typeof LOG_IN_SUCCESS,
    data: UserState,
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
    data: UserState,
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
    data: UserState,
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
    data: UserState,
}
interface UnfollowFailureAction {
    type: typeof UNFOLLOW_FAILURE,
    error: string,
}
interface AddPostToCurrentUserAction {
    type: typeof ADD_POST_TO_CURRENT_USER,
    data: string,
}
interface RemovePostFromCurrentUserAction {
    type: typeof REMOVE_POST_FROM_CURRENT_USER,
}

const initialState: UserState = {
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
    ownUser: null,
    signUpData: {},
    loginData: {},
};

// action creator
export const loginRequestAction = (data: UserState): LoginRequestAction => {
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
                draft.ownUser = null;
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
                draft.ownUser?.Followings.push({ id: action.data });
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
                    draft.ownUser.Followings = draft.ownUser.Followings.filter((value) => value.id !== action.data);
                }
                break;
            case UNFOLLOW_FAILURE:
                draft.unfollowLoading = false;
                draft.unfollowError = action.error;
                break;
            case ADD_POST_TO_CURRENT_USER:
                if (draft.ownUser)
                    draft.ownUser.Posts.unshift({ id: action.data });
                break;
            case REMOVE_POST_FROM_CURRENT_USER:
                if (draft.ownUser)
                    draft.ownUser.Posts = draft.ownUser.Posts.filter((value) => value.id !== action.data);
                break;
            default:
                break;
        }
    });
};

export default reducer;