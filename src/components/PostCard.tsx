import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined } from "@ant-design/icons";
import { Button, Card, Popover } from "antd";

const PostCard = ({ post }) => {
    return (
        <div>
            <Card
                cover={post.images[0] && <PostImages images={post.images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    <HeartOutlined key="heart" />,
                    <MessageOutlined key="comment" />,
                    <Popover key="more" content={[
                        <Button.Group>
                            {ownUser && <Button>수정</Button>
                            <Button>삭제</Button>}
                            <Button>신고</Button>
                        </Button.Group>
                    ]}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
            >
                <Image />
                <Content />
                <Buttons>

                </Buttons>
            </Card>
            <CommentForm />
            <Comments />
        </div>
    );
}

export default PostCard;