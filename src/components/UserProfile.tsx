import { Card, Avatar, Button } from 'antd';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled(Button)`
    margin-top: 10px;
`;

const UserProfile = ({ setIsLoggedIn }) => {
    const router = useRouter();

    const onLogOut = useCallback(() => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        router.push('/');
    }, [])

    return (
        <Card
            actions={[
                <div key="twit">트윗<br />0</div>,
                <div key="followings">팔로잉<br />0</div>,
                <div key="followers">필로워<br />0</div>,
            ]}
        >
            <Card.Meta 
                avatar={<Avatar>LGH</Avatar>}
                title="이건혁"
            />
            <ButtonWrapper onClick={onLogOut}>로그아웃</ButtonWrapper>
        </Card>
    );
};

export default UserProfile;