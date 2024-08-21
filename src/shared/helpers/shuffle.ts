/**
 * 첫 번째 파라미터로 들어온 배열을 섞는 함수
 *
 * @param list 섞을 배열
 * @returns 섞어진 배열
 */
export const shuffle = <T = any>(list: T[]): T[] => {
  let currentIndex = list.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [list[currentIndex], list[randomIndex]] = [
      list[randomIndex],
      list[currentIndex],
    ];
  }

  return list;
};
