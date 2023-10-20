import axios from "axios";
import { RequestData } from ".";

export function addPostAPI(data: RequestData) {
    return axios.post('/post', { content: data });
}

export function removePostAPI(data: RequestData) {
    return axios.delete(`/post/${data}`);
}

export function loadPostAPI(data: RequestData) {
    return axios.get('/posts');
}

export function likePostAPI(data: RequestData) {
    return axios.patch(`/post/${data}/like`);
}

export function disLikePostAPI(data: RequestData) {
    return axios.delete(`/post/${data}/like`);
}

export function addCommentAPI(data: RequestData) { // POST post/1/comment
    return axios.post(`/post/${data.postId}/comment`, data);
}

// form 데이터는 그대로 전달해야지 중괄호로 감싸게 되면 JSON형식으로 변환된다는 것에 주의
export function uploadImagesAPI(data: RequestData) { // POST post/1/comment
    return axios.post(`/post/images`, data);
}

