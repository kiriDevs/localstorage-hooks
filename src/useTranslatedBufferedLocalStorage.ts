import useTranslatedLocalStorage from "./useTranslatedLocalStorage";
import { useState } from "react";

const useTranslatedBufferedLocalStorage = <ContentType>(lsKey: string, defaultValue: ContentType) => {
    const [lsValue, lsWrite] = useTranslatedLocalStorage<ContentType>(lsKey, defaultValue);
    const [buffer, setBuffer] = useState<ContentType>(lsValue);

    return {
        v: buffer,
        set: setBuffer,
        write: () => lsWrite(buffer)
    };
}

export default useTranslatedBufferedLocalStorage;