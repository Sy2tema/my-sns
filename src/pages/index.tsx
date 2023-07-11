import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

// nextjs는 12, antd는 4버전으로 맞추자
const Home = () => {
  const ownUser = useSelector((state: RootState) => state.user.ownUser);
  const mainPosts = useSelector((state: RootState) => state.post.mainPosts);

  return (
    <AppLayout>
      {ownUser && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
}

export default Home;