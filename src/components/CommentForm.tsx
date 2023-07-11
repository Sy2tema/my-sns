import { Button, Form, Input } from "antd";
import useInput from "../hooks/useInput";
import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { ADD_COMMENT_REQUEST } from "../actions";

const CommentForm = ({ post }) => {
    const dispatch = useDispatch();
    const id = useSelector((state: RootState) => state.user.ownUser?.id);
    const { addCommentDone } = useSelector((state: RootState) => state.post);
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if (addCommentDone) {
            setCommentText("");
        }
    })

    const onSubmitForm = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id },
        });
    }, [commentText]);

    return (
        <Form onFinish={onSubmitForm}>
            <Form.Item style={{ position: 'relative', margin: 0 }}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button style={{ position: 'absolute', right: 0, bottom: -40 }} type="primary" htmlType="submit">트윗</Button>
            </Form.Item>
        </Form>
    );
};

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}

export default CommentForm;