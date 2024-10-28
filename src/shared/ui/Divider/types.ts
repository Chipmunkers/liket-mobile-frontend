export type Props = {
  /**
   * 세로 길이
   */
  height: string;

  /**
   * 가로 길이
   */
  width: string;

  /**
   * 마진 값
   */
  margin?: string;

  /**
   * 방향
   *
   * @default horizontal
   */
  orientation?: "horizontal" | "vertical";
};
