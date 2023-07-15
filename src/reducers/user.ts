import shortId from "shortid";
import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
    ADD_POST_TO_CURRENT_USER, REMOVE_POST_FROM_CURRENT_USER
} from "../actions";
import { produce } from "immer";

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
    ownUser: {} | null;
    signUpData: {};
    loginData: {};
}

type UserAction = LoginRequestAction | LoginSuccessAction | LoginFailureAction
    | LogoutRequestAction | LogoutSuccessAction | LogoutFailureAction
    | SignupRequestAction | SignupSuccessAction | SignupFailureAction
    | ChangeNicknameRequestAction | ChangeNicknameSuccessAction | ChangeNicknameFailureAction
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
}
interface ChangeNicknameSuccessAction {
    type: typeof CHANGE_NICKNAME_SUCCESS,
}
interface ChangeNicknameFailureAction {
    type: typeof CHANGE_NICKNAME_FAILURE,
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

const dummyUser = (data: UserState) => ({
    ...data,
    nickname: "Sy2tema",
    id: "1@1.1",
    Posts: [{ id: "1" }],
    Followings: [{ nickname: "건혁" }, { nickname: "William Lee" }],
    Followers: [{ nickname: "건혁" }, { nickname: "William Lee" }],
});

const reducer = (state = initialState, action: UserAction): UserState => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.loginLoading = true;
                draft.loginError = null;
                draft.loginDone = false;
                break;
            case LOG_IN_SUCCESS:
                draft.loginLoading = false;
                draft.loginDone = true;
                draft.ownUser = dummyUser(action.data);
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
            case ADD_POST_TO_CURRENT_USER:
                draft.ownUser.Posts.unshift({ id: action.data });
                break;
            case REMOVE_POST_FROM_CURRENT_USER:
                draft.ownUser.Posts = draft.ownUser.Posts.filter((value) => value.id !== action.data);
                break;
            default:
                break;
        }
    });
};

export default reducer;