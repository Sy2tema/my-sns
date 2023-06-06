import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import reducer from '../reducers'
import { composeWithDevTools } from "redux-devtools-extension";

// @reduxjs/toolkit의 권장사용을 유도하기 위해서 createStore에 취소선을 그어두었다.
const configureStore = () => {
    const middlewares = [];
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares));
    const store = createStore(reducer, enhancer);
    return store;
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
