import React, { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Input, Row, Col } from 'antd';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// 이미 있는 컴포넌트를 커스텀할 수 있다.
const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        if (storedIsLoggedIn) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    };

    return (
        <div>
            <Menu mode='horizontal'>
                <Menu.Item>
                    <Link href="/"><a>프로젝트 홈</a></Link>
                </Menu.Item>
                {isLoggedIn && (
                    <Menu.Item>
                        <Link href="/profile"><a>프로필</a></Link>
                    </Menu.Item>
                )}
                <Menu.Item>
                    <SearchInput enterButton />
                </Menu.Item>
            </Menu>
            <Row gutter={4}>
                <Col xs={24} md={6}>
                    {isLoggedIn ? <UserProfile /> : <LoginForm />}
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