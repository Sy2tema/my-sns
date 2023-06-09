import { useCallback } from "react";
import { Button, Form, Input } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import userInput from "../hooks/userInput";
import { addPost } from "../reducers/post";

const PostForm = () => {
    const dispatch = useDispatch();
    const imagePaths = useSelector((state: RootState) => state.post.imagePaths);
    const [text, onChangeText] = userInput("");
    const onSubmit = useCallback(() => {
        console.log(text);
        dispatch(addPost(text));
    }, [dispatch, text]);

    return (
        <Form
            style={{ margin: '10px 0 20px' }}
            encType="multipart/form-data"
            onFinish={onSubmit}
        >
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요?"
            />
            <div>
                <input type="file" multiple hidden />
                <Button>이미지 업로드</Button>
                <Button type="primary" style={{ float: 'right' }} htmlType="submit">트윗</Button>
            </div>
            <div>
                {imagePaths.map((value) => (
                    <div key={value} style={{ display: 'inline-block' }}>
                        <img src={value} style={{ width: '200px' }} alt={value} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>

                ))}
            </div>
        </Form>
    );
}

export default PostForm;