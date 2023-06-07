const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '이건혁'
        },
        content: '첫 번째 게시글 #해시태그 #익스프레스',
        Images: [{
            src: 'https://cdn.pixabay.com/photo/2023/05/27/11/12/naxos-8021321_1280.jpg'
        },],
        Comments: [{
            User: {
                nickname: '답변자',
            },
            content: '예시 답글',
        }],
    }],
    imagePaths: [],
    postAdded: false,
};

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST,
}

const dummyPost = {
    id: 2,
    User: {
        id: 1,
        nickname: '이건혁',
    },
    content: '더미게시글입니다.',
    Images: [],
    Comments: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            };
        default:
            return state;
    }
};

export default reducer;