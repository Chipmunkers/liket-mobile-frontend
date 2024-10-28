import {
  LIKET_CARD_HEIGHT,
  LIKET_CARD_WIDTH,
  PADDING_BETWEEN_TEXT_AND_BOX,
  RECT_HEIGHT,
} from "@/app/create/liket/_consts/size";

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

export const getXPos = (text: string) =>
  +LIKET_CARD_WIDTH.replace("px", "") / 2 -
  (getPxLength(text) + 2 * PADDING_BETWEEN_TEXT_AND_BOX) / 2;

export const yPos = +LIKET_CARD_HEIGHT.replace("px", "") / 2 - RECT_HEIGHT / 2;
