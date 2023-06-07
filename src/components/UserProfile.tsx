import { Card, Avatar, Button } from 'antd';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logoutAction } from '../reducers/user';

const ButtonWrapper = styled(Button)`
    margin-top: 10px;
`;

const UserProfile = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const onLogOut = useCallback(() => {
        dispatch(logoutAction());
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