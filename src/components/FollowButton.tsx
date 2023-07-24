import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { useCallback } from 'react';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../actions';

const FollowButton = ({ post }) => {
    const { ownUser, followLoading, unfollowLoading } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const isFollowing = ownUser?.Followings.find((value) => value.id === post.User.id);
    const onClickButton = useCallback(() => {
        if (isFollowing) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id,
            });
        } else {
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id,
            })
        }
    }, [isFollowing]);

    return (
        <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
            {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
    );
}

FollowButton.propTypes = {
    post: PropTypes.object.isRequired,
}

export default FollowButton;