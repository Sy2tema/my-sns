import { Button, Form, Input } from "antd";
import useInput from "../hooks/useInput";
import { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const CommentForm = ({ post }) => {
    const id = useSelector((state) => state.user.ownUser?.id);
    const [commentText, onChangeCommentText] = useInput('');
    const onSubmitForm = useCallback(() => {
        console.log(post.id, commentText);
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