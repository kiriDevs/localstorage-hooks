import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useBufferedLocalStorage = (lsKey: string, defaultValue: string = "") => {
  const [lsValue, lsWrite] = useLocalStorage(lsKey, defaultValue);
  const [buffer, setBuffer] = useState(lsValue);

  return {
    v: buffer,
    set: setBuffer,
    write: () => {
      lsWrite(buffer);
    }
  };
};

export default useBufferedLocalStorage;