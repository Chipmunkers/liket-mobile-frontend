import RightArrow from "@/icons/right-arrow.svg";
import Checkbox from "./Checkbox";

interface CheckBoxWithLinkProps {
  isChecked: boolean;
  rightArrow?: boolean;
  children: string;
  onChangeCheckbox: (isChecked: boolean) => void;
  onClickListItem: () => void;
}

const CheckBoxWithLink = ({
  rightArrow = false,
  isChecked,
  children,
  onChangeCheckbox,
  onClickListItem,
}: CheckBoxWithLinkProps) => {
  return (
    <div className="flex items-center">
      <Checkbox
        label=""
        isChecked={isChecked}
        size="14px"
        onChange={onChangeCheckbox}
      />
      <button
        className="flex grow ml-[8px]"
        onClick={onClickListItem}
        type="button"
      >
        <div className="text-body3 grow text-start">{children}</div>
        {rightArrow && (
          <RightArrow
            style={{
              display: "inline",
            }}
          />
        )}
      </button>
    </div>
  );
};

export default CheckBoxWithLink;
