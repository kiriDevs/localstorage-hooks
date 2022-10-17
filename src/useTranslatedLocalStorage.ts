import { Dispatch, SetStateAction, useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useJSONLocalStorage = <ContentType>(lsKey: string, defaultValue: ContentType) => {
    // Stringify the default value to pass into the regular useLocalStorage
    const jsonDefaultValue = JSON.stringify(defaultValue);
    const [_value, _setValue] = useLocalStorage(lsKey, jsonDefaultValue);

    // Create an intermediate state variable and 2-way-synchronize it to the actual
    const [value, setValue] = useState(defaultValue);
    useEffect(() => { setValue(JSON.parse(_value)); }, [_value, setValue]);
    useEffect(() => { _setValue(JSON.stringify(value)); }, [value, _setValue]);

    // Returning the intermediate's set is enough, since it is synced to the useLocalStorage via side effect
    return [value, setValue] as [ContentType, Dispatch<SetStateAction<ContentType>>];
}

export default useJSONLocalStorage;
