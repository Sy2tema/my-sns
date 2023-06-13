import PropTypes from 'prop-types';
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Popover } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import PostImages from './PostImages';

const PostCard = ({ post }) => {
    const id = useSelector((state: RootState) => state.user.ownUser?.id);

    return (
        <div>
            <Card
                // cover={post.images[0] && <PostImages images={post.images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    <HeartOutlined key="heart" />,
                    <MessageOutlined key="comment" />,
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
            {/* <CommentForm />
            <Comments /> */}
        </div>
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