import { createWrapper } from "next-redux-wrapper";
import { Middleware, Store, applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import createSagaMiddleware, { Task } from "redux-saga";
import reducer from '../reducers'
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from '../sagas';

// redux의 store타입을 확장해준다
interface SagaStore extends Store {
    sagaTask?: Task;
}

const loggerMiddleware: Middleware = ({ dispatch, getState }) => (next) => (action) => {
    console.log('현재 상태', action);
    if (typeof action === 'function') {
        console.log('변경된 상태', getState());
        return action(dispatch, getState);
    }

    return next(action);
};

const configureStore = (): SagaStore => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, loggerMiddleware];

    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares));

    const store: SagaStore = createStore(reducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
