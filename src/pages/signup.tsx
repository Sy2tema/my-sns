import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import styled from "styled-components";
import { Button, Checkbox, Form } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import Router from "next/router";
import { SIGN_UP_REQUEST } from "../reducers/user/actionTypes";

const ErrorMessage = styled.div`
    color: red;
`;

const Signup = () => {
    const dispatch = useDispatch();
    const { signupLoading, signupDone, signupError, ownUser } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (ownUser && ownUser.id) {
            Router.replace("/");
        }
    }, [ownUser]);

    useEffect(() => {
        if (signupDone) {
            Router.replace('/');
        }
    }, [signupDone]);

    useEffect(() => {
        if (signupError) {
            // state를 이용해 화면에 직접 그릴 수 있음
            alert(signupError);
        }
    }, [signupError]);

    const [email, onChangeEmail] = useInput("");
    const [nickname, onChangeNickname] = useInput("");
    // 비밀번호 중복 체크 부분은 커스텀 훅을 사용하지 않음
    const [password, onChangePassword] = useInput("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);

    const [term, setTerm] = useState(false);
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e: CheckboxChangeEvent) => {
        setTerm(e.target.checked);
        setTermError(false);
    }, []);

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        console.log(email, nickname, password);
        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, nickname, password },
        });
    }, [dispatch, email, nickname, password, passwordCheck, term]);

    return (
        <AppLayout>
            <Head>
                <meta charSet='utf-8' />
                <title>회원가입 | MySNS</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br />
                    <input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br />
                    <input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호 확인</label>
                    <br />
                    <input
                        name="user-password-check"
                        type="password"
                        value={passwordCheck}
                        required
                        onChange={onChangePasswordCheck} />
                    {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관 확인</Checkbox>
                    {termError && <ErrorMessage style={{ color: 'red' }}>약관 동의를 체크해주세요</ErrorMessage>}
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit" loading={signupLoading}>가입하기</Button>
                </div>
            </Form>
        </AppLayout>
    );
}

export default Signup;