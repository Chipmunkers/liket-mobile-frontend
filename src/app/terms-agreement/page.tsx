"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import Divider from "@/shared/ui/Divider";
import CheckBox from "@/shared/ui/CheckBox";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import Button from "@/shared/ui/Button";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import TermsItem from "./_ui/TermsItem";
import { useGetTosAll } from "./_hooks/useGetTosAll";
import { isAllAgree } from "@/app/terms-agreement/_util/isAllAgree";

export default function Page() {
  const router = useRouter();

  const [agree, setAgree] = useState<boolean[]>([]);
  const { data: tosListData } = useGetTosAll();

  useEffect(() => {
    if (!tosListData) return;

    setAgree(tosListData.tosList.map((tos) => false));
  }, [tosListData]);

  const [allAgree, setAllAgree] = useState(false);

  useEffect(() => {
    console.log(agree);

    setAllAgree(isAllAgree(agree));
  }, [agree]);

  if (!tosListData) {
    return null;
  }

  const { tosList } = tosListData;

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            close: {
              onClick: () => stackRouterBack(router),
            },
          }}
        />
        <HeaderMiddle text="로그인" />
      </Header>
      <main className="px-[24px] pt-[15px]">
        <div className="my-[8px]">
          <CheckBox
            label="전체 약관동의"
            size="14px"
            isBoard
            isChecked={allAgree}
            onChange={() => {
              if (allAgree) {
                setAgree(agree.map(() => false));
                return;
              }

              setAgree(agree.map(() => true));
            }}
            marginBetweenTextAndCheckbox="8px"
          />
        </div>
        <Divider width="100%" height="1px" margin="0 0 16px 0" />
        {agree.map((agreeState, i) => (
          <TermsItem
            agree={agree}
            setAgree={setAgree}
            i={i}
            tos={tosList[i]}
            isCheck={agreeState}
            key={`${agreeState}-${i}`}
          />
        ))}
      </main>
      <BottomButtonTab shadow>
        <Button
          className="flex-1 h-[48px]"
          disabled={!isAllAgree(agree)}
          onClick={() =>
            stackRouterPush(router, {
              path: "/signup/social",
              screen: WEBVIEW_SCREEN.SOCIAL_SIGNUP,
            })
          }
        >
          다음
        </Button>
      </BottomButtonTab>
      {/* <div
        className={classNames(
          "full-modal",
          !isTownSelectionModalOpen && "hidden"
        )}
      >
        <Header>
          <HeaderLeft
            option={{
              back: {
                onClick: () => {
                  setDetailTosIdx(undefined);
                  stackRouterBack(router);
                },
              },
            }}
          />
          <HeaderMiddle text={detailTosData?.title || ""} />
        </Header>
        <div className="full-modal-main">
          <div className="flex grow h-[100%]">
            <div>{detailTosData?.contents}</div>
          </div>
        </div>
      </div> */}
    </>
  );
}
