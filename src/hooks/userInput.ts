import { ChangeEvent, useCallback, useState } from "react";

// 커스텀 훅
// eslint-disable-next-line import/no-anonymous-default-export
export default (initialValue = ""): [string, (e: ChangeEvent<HTMLInputElement>) => void] => {
    const [value, setValue] = useState(initialValue);
    const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }, []);

    return [value, handler];
};