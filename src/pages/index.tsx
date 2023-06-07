import React from 'react';
import ReactDOM from 'react-dom/client';
import AppLayout from '../components/AppLayout';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

// nextjs는 12, antd는 4버전으로 맞추자
const Home = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const mainPosts = useSelector((state: RootState) => state.post.mainPosts);

  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
}

export default Home;