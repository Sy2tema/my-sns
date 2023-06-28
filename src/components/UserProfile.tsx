import { Card, Avatar, Button } from 'antd';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logoutRequestAction } from '../reducers/user';
import { RootState } from '../reducers';

const ButtonWrapper = styled(Button)`
    margin-top: 10px;
`;

const UserProfile = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { ownUser, logoutDone } = useSelector((state: RootState) => state.user);

    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction());
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
                avatar={<Avatar>{ownUser.nickname[0]}</Avatar>}
                title={ownUser.nickname}
            />
            <ButtonWrapper onClick={onLogOut} loading={logoutDone}>로그아웃</ButtonWrapper>
        </Card>
    );
};

export default UserProfile;