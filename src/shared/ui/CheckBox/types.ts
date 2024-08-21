export type Props = {
  /**
   * 라벨 이름
   *
   * @example 입장료
   */
  label: string;

  /**
   * 사이즈
   *
   * @example 12
   * @default 12px
   */
  size?: "12px" | "14px" | "16px";

  /**
   * 체크 되어있는지 여부
   */
  isChecked: boolean;
  isBoard?: boolean;
  marginBetweenTextAndCheckbox?: string;
  onChange?: (isChecked: boolean) => void;

  /**
   * 버튼 용도가 아닌 클릭 용도인지 여부
   *
   * @default false
   */
  readonly?: boolean;

  /**
   * Label className
   *
   * @default ""
   */
  labelClassName?: string;
};
