import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, LOAD_POST_REQUEST, LOAD_POST_FAILURE, LOAD_POST_SUCCESS
} from "../actions";
import shortId from "shortid";
import { produce } from "immer";
import { faker } from "@faker-js/faker";

interface PostState {
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
}

interface PostData {
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
}

interface CommentData {
    postId: string;
    content: string;
}

type PostAction = AddPostRequestAction | AddPostSuccessAction | AddPostFailureAction
    | AddCommentRequestAction | AddCommentSuccessAction | AddCommentFailureAction
    | LoadPostRequestAction | LoadPostSuccessAction | LoadPostFailureAction
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
    data: CommentData,
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
    data: string; // postId
}
interface RemovePostFailureAction {
    type: typeof REMOVE_POST_FAILURE,
    error: string,
}
interface LoadPostRequestAction {
    type: typeof LOAD_POST_REQUEST,
}
interface LoadPostSuccessAction {
    type: typeof LOAD_POST_SUCCESS,
    data: PostData[],
}
interface LoadPostFailureAction {
    type: typeof LOAD_POST_FAILURE,
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
};

faker.seed(123);

export const generateDummyPost = (number: number) => Array(number).fill().map(() => ({
    id: shortId.generate(),
    User: {
        id: shortId.generate(),
        nickname: faker.internet.userName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
        id: shortId.generate(),
        src: faker.image.urlLoremFlickr(),
    }],
    Comments: [{
        id: shortId.generate(),
        User: {
            id: shortId.generate(),
            nickname: faker.internet.userName(),
        },
        content: faker.lorem.sentence(),
    }],
}));

//initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));

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
                draft.hasMorePost = draft.mainPosts.length < 50;
                break;
            case LOAD_POST_FAILURE:
                draft.loadPostLoading = false;
                draft.loadPostError = action.error;
                break;
            default:
                break;
        }
    });
};

export default reducer;