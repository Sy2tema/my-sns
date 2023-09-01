import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import postSaga from './post';
import userSaga from './user';

// sagas 내 모든 axios요청에는 아래의 설정값들이 기본으로 적용된다
axios.defaults.baseURL = 'http://192.168.36.128:3065';
axios.defaults.withCredentials = true; // 이 옵션을 통해 request에 쿠키와 인증 정보가 담기게 된다`

export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga),
    ]);
}