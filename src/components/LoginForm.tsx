import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import styled from 'styled-components';
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { LoginRequestAction, loginRequestAction } from "../reducers/user";
import { RootState } from "../reducers";

const ButtonWrapper = styled.div`
    margin-top: 10px;
`;

const FormWrapper = styled(Form)`
    padding: 10px;
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const { loginLoading, loginError } = useSelector((state: RootState) => state.user);
    const [id, onChangeId] = useInput("");
    const [password, onChangePassword] = useInput("");

    useEffect(() => {
        if (loginError) {
            alert(loginError);
        }
    }, [loginError]);

    // ButtonWrapper와 같은 기능을 한다.
    // const style = useMemo(() => ({ marginTop: 10 }), []);
    const onSubmitForm = useCallback(() => {
        dispatch(loginRequestAction({ id, password }));
    }, [dispatch, id, password]);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <Input name="user-email" type="email" value={id} onChange={onChangeId} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                    name="user-password"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
            </div>
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={loginLoading}>로그인</Button>
                <Link href="/signup"><a href="/"><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    );
};

export default LoginForm;