import { Button, Form, Input } from "antd";
import useInput from "../hooks/useInput";
import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { ADD_COMMENT_REQUEST } from "../reducers/post/actionTypes";
import { PostData } from "../reducers/post/types";

const CommentForm = ({ post }: { post: PostData }) => {
    const dispatch = useDispatch();
    const id = useSelector((state: RootState) => state.user.ownUser?.id);
    const { addCommentDone, addCommentLoading } = useSelector((state: RootState) => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if (addCommentDone) {
            setCommentText("");
        }
    }, [setCommentText, addCommentDone]);

    const onSubmitComment = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id },
        });
    }, [dispatch, commentText, id, post.id]);

    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: 'relative', margin: 0 }}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button
                    style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
                    type="primary"
                    htmlType="submit"
                    loading={addCommentLoading}
                >트윗</Button>
            </Form.Item>
        </Form>
    );
};

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}

export default CommentForm;