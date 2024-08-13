import FilledCheckbox from "@/icons/checked-checkbox.svg";
import UnFilledCheckbox from "@/icons/empty-checkbox.svg";
import { classNames } from "@/utils/helpers";

interface Props {
  label: string;
  size: "12px" | "14px" | "16px";
  isChecked: boolean;
  isBoard?: boolean;
  marginBetweenTextAndCheckbox?: string;
  onChange: (isChecked: boolean) => void;
}

const Index = ({
  label,
  isChecked,
  isBoard = false,
  size,
  marginBetweenTextAndCheckbox = "0px",
  onChange,
}: Props) => {
  return (
    <label
      className={classNames(
        "flex items-center cursor-pointer",
        size == "12px" ? "text-caption text-grey-04" : "text-body3 color-body3"
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
          onChange(e.target.checked);
        }}
      />
      <p
        style={{
          marginRight: marginBetweenTextAndCheckbox,
        }}
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
          isBoard && "text-body2"
        )}
      >
        {label}
      </div>
    </label>
  );
};

export default Index;

type AsReadOnlyProps = Pick<Props, "isChecked" | "label" | "size">;

const AsReadOnly = ({ isChecked, label, size }: AsReadOnlyProps) => {
  return (
    <div
      className={classNames(
        "flex items-center",
        size == "12px" ? "text-caption text-grey-04" : "text-body3 color-body3"
      )}
      style={{
        fontSize: size,
      }}
    >
      <p className="ml-[6px]">
        {isChecked ? (
          <FilledCheckbox width="24" height="24" />
        ) : (
          <UnFilledCheckbox width="24" height="24" />
        )}
      </p>
      {label}
    </div>
  );
};

Index.AsReadOnly = AsReadOnly;
