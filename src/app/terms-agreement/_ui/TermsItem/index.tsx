import RightArrow from "@/icons/right-arrow.svg";
import CheckBox from "@/shared/ui/CheckBox";
import { Props } from "./types";

const TermsItem = ({
  title,
  isChecked,
  isEssential,
  onClickArrow,
  onChange,
}: Props) => {
  return (
    <div className="flex items-center justify-between my-[8px]">
      <CheckBox
        isChecked={isChecked}
        label={isEssential ? `[필수] ${title}` : `${title}`}
        onChange={onChange}
        marginBetweenTextAndCheckbox={"8px"}
      />
      <button onClick={onClickArrow}>
        <RightArrow />
      </button>
    </div>
  );
};

export default TermsItem;
