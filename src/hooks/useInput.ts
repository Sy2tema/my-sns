import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";

// 커스텀 훅
// eslint-disable-next-line import/no-anonymous-default-export
export default (initialValue = ""): [string, (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, Dispatch<SetStateAction<string>>] => {
    const [value, setValue] = useState(initialValue);
    const handler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }, []);

    return [value, handler, setValue];
};