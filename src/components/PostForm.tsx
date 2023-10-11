import React, { useCallback, useEffect, useRef } from "react";
import { Button, Form, Input } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { addPost } from "../reducers/post";
import useInput from "../hooks/useInput";
import { UPLOAD_IMAGES_REQUEST } from "../actions";

const PostForm = () => {
    const dispatch = useDispatch();
    const { imagePaths, addPostDone, addPostLoading } = useSelector((state: RootState) => state.post);
    const [text, onChangeText, setText] = useInput("");

    useEffect(() => {
        if (addPostDone) {
            setText("");
        }
    }, [addPostDone, setText]);

    const onSubmitPost = useCallback(() => {
        dispatch(addPost(text));
    }, [dispatch, text]);

    const imageInput = useRef<HTMLInputElement>(null);
    const onClickImageUpload = useCallback(() => {
        imageInput.current?.click();
    }, []);

    const onChangeImages = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Images', event.target.files); // 유사 배열
        const imageFormData = new FormData();
        [].forEach.call(event.target.files, (file) => {
            imageFormData.append('image', file);
        });

        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        });
    }, []);

    return (
        <Form
            style={{ margin: '10px 0 20px' }}
            encType="multipart/form-data"
            onFinish={onSubmitPost}
        >
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="어떤 신기한 일이 있었나요?"
            />
            <div>
                <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>트윗</Button>
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