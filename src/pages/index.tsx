import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POST_REQUEST } from '../reducers/post/actionTypes';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user/actionTypes';

// nextjs는 12, antd는 4버전으로 맞추자
const Home = () => {
  const dispatch = useDispatch();
  const ownUser = useSelector((state: RootState) => state.user.ownUser);
  const { mainPosts, hasMorePost, loadPostLoading, retweetError } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (retweetError)
      return alert(retweetError);
  }, [retweetError]);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    if (mainPosts.length === 0) {
      dispatch({
        type: LOAD_POST_REQUEST,
      });
    }
  }, [dispatch, mainPosts.length]);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
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

export default Home;