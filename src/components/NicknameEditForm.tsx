import { Form, Input } from "antd";
import { useMemo } from "react";
import styled from "styled-components";

const FormWrapper = styled(Form)`
    margin-bottom: '20px';
    border: '1px solid #d9d9d9';
    padding: '20px';
`;

const NicknameEditForm = () => {
    const style = useMemo(() => ({ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }), []);

    return (
        <Form style={style}>
            <Input.Search addonBefore="닉네임" enterButton="수정" />
        </Form>
    );
};

export default NicknameEditForm;