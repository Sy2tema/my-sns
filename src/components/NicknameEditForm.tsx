import { Form, Input } from "antd";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../reducers";
import useInput from "../hooks/useInput";
import { CHANGE_NICKNAME_REQUEST } from "../actions";

const FormWrapper = styled(Form)`
    margin-bottom: '20px';
    border: '1px solid #d9d9d9';
    padding: '20px';
`;

const NicknameEditForm = () => {
    const { ownUser } = useSelector((state: RootState) => state.user);
    const [nickname, onChangeNickname] = useInput(ownUser?.nickname || '');
    const dispatch = useDispatch();

    const onSubmit = useCallback(() => {
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        })
    }, [dispatch, nickname]);
    const style = useMemo(() => ({ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }), []);

    return (
        <FormWrapper
            style={style}
        >
            <Input.Search
                value={nickname}
                onChange={onChangeNickname}
                addonBefore="닉네임"
                enterButton="수정"
                onSearch={onSubmit}
            />
        </FormWrapper>
    );
};

export default NicknameEditForm;