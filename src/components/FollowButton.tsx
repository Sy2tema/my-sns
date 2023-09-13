import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { useCallback } from 'react';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../actions';
import { PostData } from '../reducers/post';

const FollowButton = ({ post }: { post: PostData }) => {
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
    }, [dispatch, isFollowing, post.User.id]);

    if (post.User.id === ownUser?.id) return null;

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