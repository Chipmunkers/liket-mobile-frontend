import CheckBox from "@/shared/ui/CheckBox";
import { Props } from "./types";

const TermsItem = ({ tos, isChecked, onChange }: Props) => {
  return (
    <div className="my-[8px]">
      <CheckBox
        isChecked={isChecked}
        label={`[필수] ${tos.title}`}
        onChange={onChange}
      />
    </div>
  );
};

export default TermsItem;
