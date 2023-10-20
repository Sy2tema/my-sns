import { ADD_POST_REQUEST, ADD_COMMENT_REQUEST } from "./actionTypes";
import { PostData, PostState } from "./types";


export const addPost = (data: PostData) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data: PostState) => ({
    type: ADD_COMMENT_REQUEST,
    data,
})
