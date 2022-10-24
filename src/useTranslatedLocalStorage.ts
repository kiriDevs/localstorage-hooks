import useLocalStorage from "./useLocalStorage";
import {useState} from "react";

export type Return<ContentType> = [
    ContentType,
    (newValue: ContentType) => void
]

const useJSONLocalStorage = <ContentType>(lsKey: string, defaultValue: ContentType) => {
    const [raw, setRaw] = useLocalStorage(lsKey, JSON.stringify(defaultValue));
    const [translated, setTranslated] = useState<ContentType>(JSON.parse(raw));

    const set = (newValue: ContentType | ((prev: ContentType) => ContentType)) => {
        if (typeof newValue === "function") {
            const newValueMaker = (newValue as (prev: ContentType) => ContentType)
            set(newValueMaker(translated));
            return;
        }

        setTranslated(newValue);
        setRaw(JSON.stringify(newValue));
    }

    return [translated, set] as Return<ContentType>;
}

export default useJSONLocalStorage;
