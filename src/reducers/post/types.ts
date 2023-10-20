import {
    REMOVE_IMAGE,
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
    UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
    DISLIKE_POST_FAILURE, DISLIKE_POST_REQUEST, DISLIKE_POST_SUCCESS,
    LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS
} from "./actionTypes";

export interface PostState {
    id: number,
    mainPosts: PostData[];
    imagePaths: string[];
    hasMorePost: boolean;
    addPostLoading: boolean;
    addPostDone: boolean;
    addPostError: boolean | string | null;
    addCommentLoading: boolean;
    addCommentDone: boolean;
    addCommentError: boolean | string | null;
    removePostLoading: boolean;
    removePostDone: boolean;
    removePostError: boolean | string | null;
    loadPostLoading: boolean;
    loadPostDone: boolean;
    loadPostError: boolean | string | null;
    likePostLoading: boolean;
    likePostDone: boolean;
    likePostError: boolean | string | null;
    dislikePostLoading: boolean;
    dislikePostDone: boolean;
    dislikePostError: boolean | string | null;
    uploadImagesLoading: boolean;
    uploadImagesDone: boolean;
    uploadImagesError: boolean | string | null;
}

export interface PostData {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    UserId: number;
    RetweetId: number;
    User: {
        id: number;
        nickname: string;
    };
    Images: {
        id: number;
        src: string;
    }[];
    Comments: CommentData[];
    Likers: {
        id: number;
    }[],
    PostId?: number,
    UserID?: number,
}

export interface CommentData {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    UserId: number;
    PostId: number;
    User: {
        id: number;
        nickname: string;
    }
}

export type PostAction = AddPostRequestAction | AddPostSuccessAction | AddPostFailureAction
    | AddCommentRequestAction | AddCommentSuccessAction | AddCommentFailureAction
    | LoadPostRequestAction | LoadPostSuccessAction | LoadPostFailureAction
    | RemovePostRequestAction | RemovePostSuccessAction | RemovePostFailureAction
    | LikePostRequestAction | LikePostSuccessAction | LikePostFailureAction
    | DisLikePostRequestAction | DisLikePostSuccessAction | DisLikePostFailureAction
    | UploadImagesRequestAction | UploadImagesSuccessAction | UploadImagesFailureAction
    | RemoveImageAction;

export interface RemoveImageAction {
    type: typeof REMOVE_IMAGE,
    data: number,
}

export interface AddPostRequestAction {
    type: typeof ADD_POST_REQUEST,
}
export interface AddPostSuccessAction {
    type: typeof ADD_POST_SUCCESS,
    data: PostData,
}
export interface AddPostFailureAction {
    type: typeof ADD_POST_FAILURE,
    error: string,
}
export interface AddCommentRequestAction {
    type: typeof ADD_COMMENT_REQUEST,
}
export interface AddCommentSuccessAction {
    type: typeof ADD_COMMENT_SUCCESS,
    data: CommentData,
}
export interface AddCommentFailureAction {
    type: typeof ADD_COMMENT_FAILURE,
    error: string,
}
export interface RemovePostRequestAction {
    type: typeof REMOVE_POST_REQUEST,
}
export interface RemovePostSuccessAction {
    type: typeof REMOVE_POST_SUCCESS,
    data: { PostId: number };
}
export interface RemovePostFailureAction {
    type: typeof REMOVE_POST_FAILURE,
    error: string,
}
export interface LoadPostRequestAction {
    type: typeof LOAD_POST_REQUEST,
}
export interface LoadPostSuccessAction {
    type: typeof LOAD_POST_SUCCESS,
    data: PostData[],
}
export interface LoadPostFailureAction {
    type: typeof LOAD_POST_FAILURE,
    error: string,
}
export interface LikePostRequestAction {
    type: typeof LIKE_POST_REQUEST,
}
export interface LikePostSuccessAction {
    type: typeof LIKE_POST_SUCCESS,
    data: {
        PostId: number,
        UserId: number,
    },
}
export interface LikePostFailureAction {
    type: typeof LIKE_POST_FAILURE,
    error: string,
}
export interface DisLikePostRequestAction {
    type: typeof DISLIKE_POST_REQUEST,
}
export interface DisLikePostSuccessAction {
    type: typeof DISLIKE_POST_SUCCESS,
    data: {
        PostId: number,
        UserId: number,
    },
}
export interface DisLikePostFailureAction {
    type: typeof DISLIKE_POST_FAILURE,
    error: string,
}
export interface UploadImagesRequestAction {
    type: typeof UPLOAD_IMAGES_REQUEST,
}
export interface UploadImagesSuccessAction {
    type: typeof UPLOAD_IMAGES_SUCCESS,
    data: string[],
}
export interface UploadImagesFailureAction {
    type: typeof UPLOAD_IMAGES_FAILURE,
    error: string,
}