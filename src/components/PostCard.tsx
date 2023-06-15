import PropTypes from 'prop-types';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Comment, List, Popover } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import PostImages from './PostImages';
import { useCallback, useState } from 'react';
import CommentForm from './CommentForm';

const PostCard = ({ post }) => {
    // 서버로부터 데이터를 받도록 수정하기 전에 더미데이터로 구현작업 진행
    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);

    const id = useSelector((state: RootState) => state.user.ownUser?.id);

    const onToggleLike = useCallback(() => {
        setLiked((prevValue) => !prevValue);
    }, []);
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prevValue) => !prevValue);
    }, []);

    return (
        <div style={{ marginBottom: 10 }}>
            <Card
                // cover={post.images[0] && <PostImages images={post.images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked
                        ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
                        : <HeartOutlined key="heart" onClick={onToggleLike} />,
                    <MessageOutlined key="comment" onClick={onToggleComment} />,
                    <Popover key="more" content={(
                        <Button.Group>
                            {id && post.User.id === id
                                ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type="primary">삭제</Button>
                                    </>
                                )
                                : <Button>신고</Button>
                            }
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
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
        </div >
    );
}

// prop-types 라이브러리를 쓸 때는 되도록 object보다는 shape를 써서 객체 내부 타입을 더 세세하게 써주는게 좋다.
PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard;