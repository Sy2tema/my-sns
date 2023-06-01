import { createWrapper } from "next-redux-wrapper";
import { legacy_createStore as createStore } from "redux";
import reducer from '../reducers'

// @reduxjs/toolkit의 권장사용을 유도하기 위해서 createStore에 취소선을 그어두었다.
const configureStore = () => {
    const store = createStore(reducer);
    return store;
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;