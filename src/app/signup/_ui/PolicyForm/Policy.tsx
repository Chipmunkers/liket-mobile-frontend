import Divider from "@/shared/ui/Divider";
import useGetTosAll from "../../_hooks/useGetTosAll";
import TermsItem from "@/app/terms-agreement/_ui/TermsItem";
import { useEffect, useState } from "react";
import CheckBox from "@/shared/ui/CheckBox";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import Button from "@/shared/ui/Button";

interface Props {
  onClickYouth: () => void;
  onClickPrivacy: () => void;
  onClickTerm: () => void;
  onClickNextButton: () => void;
}

let AGREE_ALL: boolean[] = [];
let NOT_AGREE_ALL: boolean[] = [];

const Policy = ({
  onClickYouth,
  onClickPrivacy,
  onClickTerm,
  onClickNextButton,
}: Props) => {
  const { data: tosListData } = useGetTosAll();
  const [agree, setAgree] = useState<boolean[]>([]);
  const [isAllAgree, setIsAllAgree] = useState<boolean>(false);

  useEffect(() => {
    if (!tosListData) {
      return;
    }

    AGREE_ALL = new Array(tosListData.tosList.length).fill(true);
    NOT_AGREE_ALL = new Array(tosListData.tosList.length).fill(false);
    setAgree([...NOT_AGREE_ALL]);
  }, [tosListData]);

  if (!tosListData) {
    return <></>;
  }

  const { tosList } = tosListData;

  return (
    <>
      <div className="flex flex-col px-[24px]">
        <div className="my-[8px]">
          <CheckBox
            label="약관 전체동의"
            size="14px"
            isBoard
            isChecked={isAllAgree}
            onChange={() => {
              if (isAllAgree) {
                setIsAllAgree(false);
                setAgree([...NOT_AGREE_ALL]);
                return;
              }

              setIsAllAgree(true);
              setAgree([...AGREE_ALL]);
            }}
            marginBetweenTextAndCheckbox="8px"
          />
        </div>
        <Divider width="100%" height="1px" margin="0 0 16px 0" />
        {agree.map((agreeState, index) => (
          <TermsItem
            key={index}
            isChecked={agreeState}
            isEssential={tosList[index].isEssential}
            onChange={() => {
              const newAgree = [...agree];
              newAgree[index] = !newAgree[index];

              setAgree(newAgree);
              setIsAllAgree(newAgree.every(Boolean));
            }}
            onClickArrow={() => {
              if (index === 0) {
                onClickTerm();
              } else if (index === 1) {
                onClickPrivacy();
              } else if (index === 2) {
                onClickYouth();
              }
            }}
            title={tosList[index].title}
          />
        ))}
      </div>
      <BottomButtonTab shadow>
        <Button
          className="flex-1 h-[48px]"
          disabled={!isAllAgree}
          onClick={onClickNextButton}
        >
          다음
        </Button>
      </BottomButtonTab>
    </>
  );
};

export default Policy;
