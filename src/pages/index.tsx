import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POST_REQUEST } from '../reducers/post/actionTypes';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user/actionTypes';
import wrapper from '../store/configureStore';

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
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });

  store.dispatch({
    type: LOAD_POST_REQUEST,
  });

  // Redux Saga 작업이 완료될 때까지 기다리기
  await store.sagaTask?.toPromise();

  // 모든 데이터 로딩이 완료되면 props를 반환
  return {
    props: {}, // 필요한 props를 전달
  };
});

export default Home;