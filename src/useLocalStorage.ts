import { Dispatch, SetStateAction, useState } from "react";

const useLocalStorage = (lsKey: string, defaultValue: string = "") => {
  const oldValue = window.localStorage.getItem(lsKey);
  if (!oldValue) window.localStorage.setItem(lsKey, defaultValue);

  const [value, _set] = useState(oldValue ?? defaultValue);

  const setValue = (newValue: string) => {
    window.localStorage.setItem(lsKey, newValue);
    _set(newValue);
  };

  return [value, setValue] as [string, Dispatch<SetStateAction<string>>];
};

export default useLocalStorage;
