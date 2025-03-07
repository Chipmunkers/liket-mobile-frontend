import {
  LIKET_CARD_HEIGHT,
  LIKET_CARD_WIDTH,
  PADDING_BETWEEN_TEXT_AND_BOX,
  RECT_HEIGHT,
} from "../consts/card";

/**
 * 라이켓 카드 생성시 스티커 10개까지 삽입 가능
 * 스티커는 삽입하고 삭제가 가능
 * 0번부터 9번까지 10개의 숫자 중에서 비어있는 숫자중 가장 작은 숫자를 반환함
 *
 * @param arr 각 스티커가 가지고 있는 id로만 구성된 배열
 */
export const findLowestMissingNumber = (arr: number[]): number => {
  const numberSet = new Set<number>();

  arr.forEach((num) => {
    if (num >= 0 && num <= 9) {
      numberSet.add(num);
    }
  });

  for (let i = 0; i <= 9; i++) {
    if (!numberSet.has(i)) {
      return i;
    }
  }

  return 10;
};

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
 * 라이켓 카드 위에 텍스트 문구 삽입시 텍스트가 카드의 정 가운데 배치돼야함
 * 텍스트 길이를 계산하여 텍스트가 어느 x 좌표에 배치돼야 정확히 정 가운데 배치되는지 계산하는 함수
 *
 * @param text 삽입되는 텍스트 string
 * @returns 삽입되는 텍스트의 왼쪽 위 위치
 */

export const getXPos = (text: string) =>
  +LIKET_CARD_WIDTH.replace("px", "") / 2 -
  (getPxLength(text) + 2 * PADDING_BETWEEN_TEXT_AND_BOX) / 2;

/**
 * 라이켓 카드 위에 텍스트 문구 삽입시 텍스트가 카드의 정 가운데 배치돼야함
 * 라이켓 카드의 높이를 계산하여 텍스트가 어느 y 좌표에 배치돼야 정확히 정 가운데 배치되는지 계산된 값
 */

export const yPos = +LIKET_CARD_HEIGHT.replace("px", "") / 2 - RECT_HEIGHT / 2;
