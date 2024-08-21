import { RefObject } from "react";
import dayjs from "dayjs";

/**
 * @deprecated
 */
export const classNames = (...classes: (boolean | string)[]) =>
  classes.filter(Boolean).join(" ");

/**
 * @deprecated
 */
export const getKeys = Object.keys as <T extends object>(
  obj: T
) => Array<keyof T>;

/**
 * @deprecated
 */
export const getRefValue = <C>(ref: RefObject<C>) => ref.current as C;

/**
 * @deprecated
 */
export const generateRandomId = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let randomId = "";
  for (let i = 0; i < length; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return randomId;
};

/**
 * @deprecated
 */
export const getPxLength = (text: string) => {
  const tempElem = document.createElement("span");
  tempElem.style.visibility = "hidden";
  tempElem.style.position = "absolute";
  tempElem.style.left = "-9999px";
  tempElem.style.top = "-9999px";
  tempElem.style.fontFamily = "AppleSDGothicNeo";
  tempElem.style.fontStyle = "bold";
  tempElem.style.fontSize = "16";
  tempElem.textContent = text;
  document.body.appendChild(tempElem);

  const width = tempElem.offsetWidth;
  document.body.removeChild(tempElem);
  return width;
};

/**
 * @deprecated
 */
export const getStatus = (startDate: string, endDate: string) => {
  const today = dayjs();
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  if (today.isBefore(end) && today.isAfter(end.subtract(3, "day"))) {
    return "willClosed";
  } else if (
    (today.isAfter(start) && today.isBefore(end)) ||
    today.isSame(start) ||
    today.isSame(end)
  ) {
    return "active";
  } else if (today.isAfter(end)) {
    return "closed";
  }

  return "willActive";
};
