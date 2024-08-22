import FilledCheckbox from "@/icons/checked-checkbox.svg";
import UnFilledCheckbox from "@/icons/empty-checkbox.svg";
import { Props } from "./types";
import { classNames } from "@/shared/helpers/classNames";

const CheckBox = ({
  label,
  isChecked,
  isBoard = false,
  size = "12px",
  marginBetweenTextAndCheckbox = "0px",
  onChange,
  readonly = false,
  labelClassName = "",
  className = "",
}: Props) => {
  return (
    <label
      className={classNames(
        "flex items-center ",
        size == "12px" ? "text-caption text-grey-04" : "text-body3 color-body3",
        readonly ? "" : "cursor-pointer",
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
