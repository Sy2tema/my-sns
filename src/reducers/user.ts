interface UserState {
    isLoggedIn: boolean;
    ownUser: {} | null;
    signUpData: {};
    loginData: {};
}

type UserAction = LoginAction | LogoutAction;

interface LoginAction {
    type: typeof LOG_IN,
    data: UserState,
}

interface LogoutAction {
    type: typeof LOG_OUT,
}

const initialState: UserState = {
    isLoggedIn: false,
    ownUser: null,
    signUpData: {},
    loginData: {},
};

// action creator
const LOG_IN = 'LOG_IN';
export const loginAction = (data: UserState): LoginAction => {
    return {
        type: LOG_IN,
        data,
    }
};

const LOG_OUT = 'LOG_OUT';
export const logoutAction = (): LogoutAction => {
    return {
        type: LOG_OUT,
    }
};

const reducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isLoggedIn: true,
                ownUser: action.data,
            };
        case LOG_OUT:
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