import React from 'react';
import ReactDOM from 'react-dom/client';
import AppLayout from '../components/AppLayout';

// nextjs는 12, antd는 4버전으로 맞추자
const Home = () => {
  return (
    <AppLayout>
      <div>프로젝트 홈입니다.</div>
    </AppLayout>
  );
}

export default Home;