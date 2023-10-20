import { LOG_IN_REQUEST, LOG_OUT_REQUEST } from "./actionTypes";
import { LoginData, LoginRequestAction, LogoutRequestAction } from "./types";

// action creator
export const loginRequestAction = (data: LoginData): LoginRequestAction => {
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