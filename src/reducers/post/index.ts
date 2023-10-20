import { produce } from "immer";
import {
    REMOVE_IMAGE,
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
    LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
    DISLIKE_POST_REQUEST, DISLIKE_POST_SUCCESS, DISLIKE_POST_FAILURE,
    UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE
} from "./actionTypes";
import { PostState, PostAction } from "./types";

const initialState: PostState = {
    id: -1,
    mainPosts: [],
    imagePaths: [],
    hasMorePost: true,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: null,
    likePostLoading: false,
    likePostDone: false,
    likePostError: null,
    dislikePostLoading: false,
    dislikePostDone: false,
    dislikePostError: null,
    uploadImagesLoading: false,
    uploadImagesDone: false,
    uploadImagesError: null,
};

const reducer = (state = initialState, action: PostAction): PostState => {
    return produce(state, (draft) => {
        switch (action.type) {
            case REMOVE_IMAGE:
                draft.imagePaths = draft.imagePaths.filter((value, index) => index !== action.data);
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.mainPosts.unshift(action.data);
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.imagePaths = [];
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                const post = draft.mainPosts.find((value) => Number(value.id) === action.data.PostId);
                post?.Comments.unshift(action.data);
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.mainPosts = draft.mainPosts.filter((value) => Number(value.id) !== action.data.PostId);
                draft.removePostLoading = false;
                draft.removePostDone = true;
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case LOAD_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;
            case LOAD_POST_SUCCESS:
                // draft와 action을 바꾸면 최신 게시글이 가장 위로 가도록 수정할 수 있다.
                draft.mainPosts = draft.mainPosts.concat(action.data);
                draft.loadPostLoading = false;
                draft.loadPostDone = true;
                draft.hasMorePost = draft.mainPosts.length < action.data.length;
                break;
            case LOAD_POST_FAILURE:
                draft.loadPostLoading = false;
                draft.loadPostError = action.error;
                break;
            case LIKE_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;
            case LIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((value) => Number(value.id) === action.data.PostId);
                post?.Likers.push({ id: action.data.UserId });
                draft.likePostLoading = false;
                draft.likePostDone = true;
                break;
            }
            case LIKE_POST_FAILURE:
                draft.likePostLoading = false;
                draft.likePostError = action.error;
                break;
            case DISLIKE_POST_REQUEST:
                draft.dislikePostLoading = true;
                draft.dislikePostDone = false;
                draft.dislikePostError = null;
                break;
            case DISLIKE_POST_SUCCESS: {
                const postIndex = draft.mainPosts.findIndex((value) => Number(value.id) === action.data.PostId);
                if (postIndex > -1) { // 데이터 일관성을 위해 post의 인덱스를 찾은 후 해당 인덱스가 유효한 경우에만 Likers 배열을 수정하도록 조치합니다
                    const post = draft.mainPosts[postIndex];
                    post.Likers = post.Likers.filter((value) => value.id !== action.data.UserId);
                    draft.dislikePostLoading = false;
                    draft.dislikePostDone = true;
                }
                break;
            }
            case DISLIKE_POST_FAILURE:
                draft.uploadImagesLoading = false;
                draft.uploadImagesError = action.error;
                break;
            case UPLOAD_IMAGES_REQUEST:
                draft.uploadImagesLoading = true;
                draft.uploadImagesDone = false;
                draft.uploadImagesError = null;
                break;
            case UPLOAD_IMAGES_SUCCESS:
                draft.imagePaths = action.data;
                draft.uploadImagesLoading = false;
                draft.uploadImagesDone = true;
                break;
            case UPLOAD_IMAGES_FAILURE:
                draft.uploadImagesLoading = false;
                draft.uploadImagesError = action.error;
                break;
            default:
                break;
        }
    });
};

export default reducer;