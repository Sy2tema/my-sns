import PropTypes from 'prop-types';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Comment, List, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import PostImages from './PostImages';
import { useCallback, useState } from 'react';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
import { REMOVE_POST_REQUEST } from '../reducers/post/actionTypes';
import { PostData, CommentData } from '../reducers/post/types';
import { LIKE_POST_REQUEST, DISLIKE_POST_REQUEST } from '../reducers/user/actionTypes';

const PostCard = ({ post }: { post: PostData }) => {
    // 서버로부터 데이터를 받도록 수정하기 전에 더미데이터로 구현작업 진행
    const dispatch = useDispatch();
    const { removePostLoading } = useSelector((state: RootState) => state.post);
    const [commentFormOpened, setCommentFormOpened] = useState(false);

    const id = useSelector((state: RootState) => state.user.ownUser?.id);
    const liked = post.Likers?.find((value) => value.id === id);

    const onLike = useCallback(() => {
        dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id,
        })
    }, [dispatch, post.id]);

    const onDisLike = useCallback(() => {
        dispatch({
            type: DISLIKE_POST_REQUEST,
            data: post.id,
        })
    }, [dispatch, post.id]);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prevValue) => !prevValue);
    }, []);

    const onRemovePost = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        });
    }, [dispatch, post.id]);

    return (
        <div style={{ marginBottom: 10 }}>
            <Card
                cover={post.Images?.[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked
                        ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onDisLike} />
                        : <HeartOutlined key="heart" onClick={onLike} />,
                    <MessageOutlined key="comment" onClick={onToggleComment} />,
                    <Popover key="more" content={(
                        <Button.Group>
                            {id && post.User.id === id
                                ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type="primary" onClick={onRemovePost} loading={removePostLoading}>삭제</Button>
                                    </>
                                )
                                : <Button>신고</Button>
                            }
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
                extra={id && <FollowButton post={post} />}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User?.nickname[0]}</Avatar>}
                    title={post.User?.nickname}
                    description={<PostCardContent postData={post.content} />}
                />
            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item: CommentData) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>
            )}
        </div>
    );
}

// prop-types 라이브러리를 쓸 때는 되도록 object보다는 shape를 써서 객체 내부 타입을 더 세세하게 써주는게 좋다.
PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.string,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
        Likers: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard;