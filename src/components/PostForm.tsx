import React, { useCallback, useEffect, useRef } from "react";
import { Button, Form, Input } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import useInput from "../hooks/useInput";
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from "../reducers/post/actionTypes";

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
        if (!text || !text.trim()) {
            return alert("텍스트를 입력해주세요.");
        }

        const formData = new FormData();
        imagePaths.forEach((path) => {
            formData.append('image', path);
        })
        formData.append('content', text);

        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    }, [dispatch, imagePaths, text]);

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
    }, [dispatch]);

    // 동기 action
    const onRemoveImage = useCallback((index: number) => () => {
        dispatch({
            type: REMOVE_IMAGE,
            data: index,
        });
    }, [dispatch]);

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
                {imagePaths.map((value, index) => (
                    <div key={value} style={{ display: 'inline-block' }}>
                        <img src={`http://192.168.36.128:3065/${value}`} style={{ width: '200px' }} alt={value} />
                        <div>
                            <Button onClick={onRemoveImage(index)}>제거</Button>
                        </div>
                    </div>

                ))}
            </div>
        </Form>
    );
}

export default PostForm;