import CheckBox from "@/shared/ui/CheckBox";
import { Props } from "./types";
import { useEffect, useState } from "react";

const TermsItem = ({ tos, isCheck = false, setAgree, i, agree }: Props) => {
  const [isChecked, setIsChecked] = useState(isCheck);

  useEffect(() => {
    let tempAgree = agree;
    agree[i] = isChecked;
    setAgree(tempAgree);
  }, [isChecked]);

  return (
    <div className="my-[8px]">
      <CheckBox
        isChecked={isChecked}
        label={`[필수] ${tos.title}`}
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
    </div>
  );
};

export default TermsItem;
