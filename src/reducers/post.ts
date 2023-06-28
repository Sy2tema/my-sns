import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE } from "../actions";

interface PostState {
    mainPosts: {
        id: number;
        User: {
            id: number;
            nickname: string;
        };
        content: string;
        Images: {
            src: string;
        }[];
        Comments: {
            User: {
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
}

type PostAction = AddPostRequestAction | AddPostSuccessAction | AddPostFailureAction | AddCommentRequestAction | AddCommentSuccessAction | AddCommentFailureAction;

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

const initialState: PostState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'William'
        },
        content: '첫 번째 게시글 #해시태그 #익스프레스',
        Images: [{
            src: 'https://cdn.pixabay.com/photo/2023/05/27/11/12/naxos-8021321_1280.jpg'
        }, {
            src: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg'
        }, {
            src: 'https://cdn.pixabay.com/photo/2023/05/07/09/59/mountains-7976041_1280.jpg'
        }],
        Comments: [{
            User: {
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
};


export const addPost = (data: PostState) => ({
    type: ADD_POST_REQUEST,
    data,
});

const dummyPost = {
    id: 2,
    User: {
        id: 1,
        nickname: 'William',
    },
    content: '더미게시글입니다.',
    Images: [],
    Comments: [],
}

const reducer = (state = initialState, action: PostAction): PostState => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            };
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                addPostLoading: false,
                addPostDone: true,
            };
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            };
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            };
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                addCommentLoading: false,
                addCommentDone: true,
            };
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error,
            };
        default:
            return state;
    }
};

export default reducer;