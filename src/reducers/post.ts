import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE
} from "../actions";
import shortId from "shortid";
import { produce } from "immer";

interface PostState {
    mainPosts: {
        id: string;
        User: {
            id: string;
            nickname: string;
        };
        content: string;
        Images: {
            id: string;
            src: string;
        }[];
        Comments: {
            id: string;
            User: {
                id: string;
                nickname: string;
            };
            content: string;
        }[];
    }[];
    imagePaths: string[];
    addPostLoading: boolean;
    addPostDone: boolean;
    addPostError: boolean | string | null;
    addCommentLoading: boolean;
    addCommentDone: boolean;
    addCommentError: boolean | string | null;
    removePostLoading: boolean;
    removePostDone: boolean;
    removePostError: boolean | string | null;
}

type PostAction = AddPostRequestAction | AddPostSuccessAction | AddPostFailureAction
    | AddCommentRequestAction | AddCommentSuccessAction | AddCommentFailureAction
    | RemovePostRequestAction | RemovePostSuccessAction | RemovePostFailureAction;

interface AddPostRequestAction {
    type: typeof ADD_POST_REQUEST,
}
interface AddPostSuccessAction {
    type: typeof ADD_POST_SUCCESS,
    data: PostState,
}
interface AddPostFailureAction {
    type: typeof ADD_POST_FAILURE,
    error: string,
}
interface AddCommentRequestAction {
    type: typeof ADD_COMMENT_REQUEST,
}
interface AddCommentSuccessAction {
    type: typeof ADD_COMMENT_SUCCESS,
    data: PostState,
}
interface AddCommentFailureAction {
    type: typeof ADD_COMMENT_FAILURE,
    error: string,
}
interface RemovePostRequestAction {
    type: typeof REMOVE_POST_REQUEST,
}
interface RemovePostSuccessAction {
    type: typeof REMOVE_POST_SUCCESS,
    data: string,
}
interface RemovePostFailureAction {
    type: typeof REMOVE_POST_FAILURE,
    error: string,
}

const initialState: PostState = {
    mainPosts: [{
        id: "1",
        User: {
            id: "1@1.1",
            nickname: 'William'
        },
        content: '첫 번째 게시글 #해시태그 #익스프레스',
        Images: [{
            id: shortId.generate(),
            src: 'https://cdn.pixabay.com/photo/2023/05/27/11/12/naxos-8021321_1280.jpg'
        }, {
            id: shortId.generate(),
            src: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg'
        }, {
            id: shortId.generate(),
            src: 'https://cdn.pixabay.com/photo/2023/05/07/09/59/mountains-7976041_1280.jpg'
        }],
        Comments: [{
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: '답변자',
            },
            content: '샘플 답글',
        }],
    }],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
};

export const addPost = (data: PostState) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data: PostState) => ({
    type: ADD_COMMENT_REQUEST,
    data,
})

const dummyPost = (data) => ({
    id: data.id,
    User: {
        id: "1@1.1",
        nickname: 'William',
    },
    content: data.content,
    Images: [],
    Comments: [],
});

const dummyComment = (data) => ({
    id: shortId.generate(),
    User: {
        id: "1@1.1",
        nickname: 'William',
    },
    content: data,
});

const reducer = (state = initialState, action: PostAction): PostState => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.mainPosts.unshift(dummyPost(action.data));
                draft.addPostLoading = false;
                draft.addPostDone = true;
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
                const post = draft.mainPosts.find((value) => value.id === action.data.postId);
                post?.Comments.unshift(dummyComment(action.data.content));
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
                draft.mainPosts = draft.mainPosts.filter((value) => value.id !== action.data);
                draft.removePostLoading = false;
                draft.removePostDone = true;
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            default:
                break;
        }
    });
};

export default reducer;