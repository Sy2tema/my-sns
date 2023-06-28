import { LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from "../actions";

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
    ownUser: {} | null;
    signUpData: {};
    loginData: {};
}

type UserAction = LoginRequestAction | LoginSuccessAction | LoginFailureAction | LogoutRequestAction | LogoutSuccessAction | LogoutFailureAction | SignupRequestAction | SignupSuccessAction | SignupFailureAction;

interface LoginRequestAction {
    type: typeof LOG_IN_REQUEST,
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

const dummyUser = (data) => ({
    ...data,
    nickname: "Sy2tema",
    id: 1,
    Posts: [],
    Followings: [],
    Followers: [],
});

const reducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            return {
                ...state,
                loginLoading: true,
                loginError: null,
                loginDone: false,
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                loginDone: true,
                ownUser: dummyUser(action.data),
            }
        case LOG_IN_FAILURE:
            return {
                ...state,
                loginLoading: false,
                loginError: action.error,
            }
        case LOG_OUT_REQUEST:
            return {
                ...state,
                logoutLoading: true,
                logoutError: null,
                logoutDone: false,
            };
        case LOG_OUT_SUCCESS:
            return {
                ...state,
                logoutLoading: false,
                logoutDone: true,
                ownUser: null,
            };
        case LOG_OUT_FAILURE:
            return {
                ...state,
                logoutLoading: false,
                logoutError: action.error,
            };
        case SIGN_UP_REQUEST:
            return {
                ...state,
                signupLoading: true,
                signupError: null,
                signupDone: false,
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                signupLoading: false,
                signupDone: true,
                ownUser: null,
            };
        case SIGN_UP_FAILURE:
            return {
                ...state,
                signupLoading: false,
                signupError: action.error,
            };
        default:
            return state;
    }
};

export default reducer;