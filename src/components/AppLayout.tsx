import React, { ReactNode } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
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
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            {children}
        </div>
    );
};

// prop-types
AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;