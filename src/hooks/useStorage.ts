import { getRefValue } from "@/utils/helpers";
import { checkedLocalStorage, checkedSessionStorage } from "@/utils/storage";
import { useRef, useState } from "react";

export const useStorage = <T>(
  key: string,
  defaultValue: T,
  storageObject: "localStorage" | "sessionStorage"
) => {
  // ! 왜 있는 확인 필요
  const storageRef = useRef(
    storageObject === "localStorage"
      ? checkedLocalStorage
      : checkedSessionStorage
  );
  const [value, _setValue] = useState(() => {
    if (typeof window === "undefined") {
      return defaultValue;
    }

    return getRefValue(storageRef).getItem(key, defaultValue);
  });

  const setValue = (value: T) => {
    _setValue(value);
    getRefValue(storageRef).setItem(key, value);
  };

  const remove = () => {
    _setValue(undefined);
    getRefValue(storageRef).removeItem(key);
  };

  return [value, setValue, remove];
};
