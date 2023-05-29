import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Input, Row, Col } from 'antd';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled from 'styled-components';

// 이미 있는 컴포넌트를 커스텀할 수 있다.
const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    // 백엔드가 마련되기 전에 로그인 여부를 확인하는 더미 데이터 생성
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div>
            <Menu mode='horizontal'>
                <Menu.Item>
                    <Link href="/"><a>프로젝트 홈</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput enterButton />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={4}>
                <Col xs={24} md={6}>
                    {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn} /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    {/* noreferrer와 noopener로 새창으로 링크를 열 경우의 보안 위협을 방지해준다 */}
                    <a href="https://github.com/Sy2tema/my-sns" target="_blank" rel="noreferrer noopner">Made by 이건혁</a>
                </Col>
            </Row>
        </div>
    );
};

// prop-types
AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;