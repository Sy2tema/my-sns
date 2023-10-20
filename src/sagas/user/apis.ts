import axios from "axios";
import { RequestData } from ".";

export function loadMyInfoAPI() {
    return axios.get('/user');
}

export function loginAPI(data: RequestData) {
    return axios.post('/user/login', data);
}

export function logoutAPI() {
    return axios.post('/user/logout');
}

export function signupAPI(data: RequestData) {
    return axios.post('/user', data);
}

export function followAPI(data: RequestData) {
    return axios.patch(`/user/${data}/follow`);
}

export function unfollowAPI(data: RequestData) {
    return axios.delete(`/user/${data}/follow`);
}

export function removeFollowerAPI(data: RequestData) {
    return axios.delete(`/user/follower/${data}`);
}

export function loadFollowersAPI(data: RequestData) {
    return axios.get(`/user/followers/`);
}

export function loadFollowingsAPI(data: RequestData) {
    return axios.get(`/user/followings/`);
}

export function changeNicknameAPI(data: RequestData) {
    return axios.patch('/user/nickname', { nickname: data });
}