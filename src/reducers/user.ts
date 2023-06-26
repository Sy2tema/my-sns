interface UserState {
    isLoggedIn: boolean;
    id: number;
    ownUser: {} | null;
    signUpData: {};
    loginData: {};
}

type UserAction = LoginRequestAction | LoginSuccessAction | LoginFailureAction | LogoutRequestAction | LogoutSuccessAction | LogoutFailureAction;

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
    data: UserState,
}

interface LogoutRequestAction {
    type: typeof LOG_OUT_REQUEST,
}
interface LogoutSuccessAction {
    type: typeof LOG_OUT_SUCCESS,
}
interface LogoutFailureAction {
    type: typeof LOG_OUT_FAILURE,
}

const initialState: UserState = {
    isLoggedIn: false,
    id: -1,
    ownUser: null,
    signUpData: {},
    loginData: {},
};

export const loginAction = (data) => {
    return (dispatch) => {
        dispatch(loginRequestAction);
        axios.post('/api/login')
            .then((response) => {
                dispatch(loginSuccessAction(response.data));
            })
            .catch((error) => {
                dispatch(loginFailureAction(error));
            });
        axios.get();
    }
}

// action creator
const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const loginRequestAction = (data: UserState): LoginRequestAction => {
    return {
        type: LOG_IN_REQUEST,
        data,
    }
};
const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const loginSuccessAction = (data: UserState): LoginSuccessAction => {
    return {
        type: LOG_IN_SUCCESS,
        data,
    }
};
const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const loginFailureAction = (data: UserState): LoginFailureAction => {
    return {
        type: LOG_IN_FAILURE,
        data,
    }
};

const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const logoutRequestAction = (): LogoutRequestAction => {
    return {
        type: LOG_OUT_REQUEST,
    }
};
const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const logoutSuccessAction = (): LogoutSuccessAction => {
    return {
        type: LOG_OUT_SUCCESS,
    }
};
const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const logoutFailureAction = (): LogoutFailureAction => {
    return {
        type: LOG_OUT_FAILURE,
    }
};

const reducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            return {
                ...state,
                isLoggedIn: true,
                ownUser: action.data,
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                ownUser: action.data,
            }
        case LOG_OUT_REQUEST:
            return {
                ...state,
                isLoggedIn: false,
                ownUser: null,
            };
        default:
            return state;
    }
};

export default reducer;