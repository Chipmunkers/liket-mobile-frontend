import FilledCheckbox from "@/icons/checked-checkbox.svg";
import UnFilledCheckbox from "@/icons/empty-checkbox.svg";
import { classNames } from "@/shared/helpers/classNames";
import { SharedUiProps } from "../type/react";

type Props = SharedUiProps<{
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
}>;

const CheckBox = ({
  label,
  isChecked,
  isBoard = false,
  size = "12px",
  marginBetweenTextAndCheckbox = "0px",
  readonly = false,
  labelClassName = "",
  className = "",
  onChange,
}: Props) => {
  return (
    <label
      className={classNames(
        "flex items-center ",
        size == "12px" ? "text-caption " : "text-body3 color-body3",
        readonly && "cursor-pointer",
        className
      )}
      style={{
        fontSize: size,
      }}
    >
      <input
        className="appearance-none hidden"
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          if (readonly) return;

          onChange && onChange(e.target.checked);
        }}
      />
      <p
        style={{
          marginRight: marginBetweenTextAndCheckbox,
        }}
        className={classNames(readonly ? "" : "cursor-pointer")}
      >
        {isChecked ? (
          <FilledCheckbox width="24" height="24" />
        ) : (
          <UnFilledCheckbox width="24" height="24" />
        )}
      </p>
      <div
        className={classNames(
          "ml-[4px] text-body3 select-none",
          isBoard && "text-body2",
          labelClassName
        )}
      >
        {label}
      </div>
    </label>
  );
};

export default CheckBox;
