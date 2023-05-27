import React, { ReactNode } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div>
            <div>
                <Link href="/"><a>프로젝트 홈</a></Link>
                <Link href="/profile"><a>프로필</a></Link>
                <Link href="/signup"><a>회원가입</a></Link>
            </div>
            {children}
        </div>
    );
};

// prop-types
AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;