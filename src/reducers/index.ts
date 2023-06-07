import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from './user';
import post from './post';

const rootReducer = combineReducers({
    index: (state: Object = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                console.log('HYDRATE', action);
                return { ...state, ...action.payload };
            default:
                return state;
        }
    },
    user,
    post,
});

export default rootReducer;

// redux로 상태관리할 state의 타입을 지정해준다.
export type RootState = ReturnType<typeof rootReducer>;