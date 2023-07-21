import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POST_REQUEST } from '../actions';

// nextjs는 12, antd는 4버전으로 맞추자
const Home = () => {
  const dispatch = useDispatch();
  const ownUser = useSelector((state: RootState) => state.user.ownUser);
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300 && hasMorePost && !loadPostLoading) {
        dispatch({
          type: LOAD_POST_REQUEST,
        });
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, [hasMorePost, loadPostLoading]);


  return (
    <AppLayout>
      {ownUser && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
}

export default Home;