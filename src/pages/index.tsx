import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import { RootState } from '../reducers';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POST_REQUEST } from '../reducers/post/actionTypes';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user/actionTypes';
import { PostData } from '../reducers/post/types';
import wrapper from '../store/configureStore';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

const Home = () => {
  const dispatch = useDispatch();
  const ownUser = useSelector((state: RootState) => state.user.ownUser);
  const { mainPosts, hasMorePost, loadPostLoading, retweetError } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (retweetError)
      return alert(retweetError);
  }, [retweetError]);

  useEffect(() => {
    function onScroll() {
      const scrollPosition = window.scrollY + document.documentElement.clientHeight;
      const threshold = document.documentElement.scrollHeight * 0.75;

      if (scrollPosition > threshold) {
        if (hasMorePost && !loadPostLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POST_REQUEST,
            lastId,
          });
        }
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, [dispatch, hasMorePost, loadPostLoading, mainPosts]);

  return (
    <AppLayout>
      {ownUser && <PostForm />}
      {mainPosts.map((post: PostData) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
}

// 이 부분은 프론트 서버에서 실행되기 때문에 브라우저에서 손댈 수 없다
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context: GetServerSidePropsContext) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = cookie || '';

  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });

  store.dispatch({
    type: LOAD_POST_REQUEST,
  });

  store.dispatch(END);
  await store.sagaTask?.toPromise();

  return {
    props: {},
  };
});

export default Home;