"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import Divider from "@/shared/ui/Divider";
import CheckBox from "@/shared/ui/CheckBox";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import Button from "@/shared/ui/Button";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import TermsItem from "./_ui/TermsItem";
import { useGetTosAll } from "./_hooks/useGetTosAll";
import styled from "@emotion/styled";
import Markdown from "react-markdown";
import { useGetTosByIdx } from "./_hooks/useGetTosByIdx";

let AGREE_ALL: boolean[] = [];
let NOT_AGREE_ALL: boolean[] = [];

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const policy = searchParams.get("policy");

  const [agree, setAgree] = useState<boolean[]>([]);
  const [isAllAgree, setIsAllAgree] = useState<boolean>(false);
  const { data: tosListData } = useGetTosAll();

  const { data: policyDetail } = useGetTosByIdx(
    POLICY_TO_IDX[policy as "terms" | "privacy" | "youth"]
  );

  useEffect(() => {
    if (!tosListData) {
      return;
    }

    AGREE_ALL = new Array(tosListData.tosList.length).fill(true);
    NOT_AGREE_ALL = new Array(tosListData.tosList.length).fill(false);
    setAgree([...NOT_AGREE_ALL]);
  }, [tosListData]);

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
        <HeaderMiddle text={policy ? policyDetail?.title || "" : "로그인"} />
      </Header>
      <main className="px-[24px] pt-[15px]">
        {!policy && (
          <>
            <div className="my-[8px]">
              <CheckBox
                label="전체 약관동의"
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
                onClickArrow={() => {
                  if (index === 0) {
                    router.push("?policy=privacy");
                  } else if (index === 1) {
                    router.push("?policy=terms");
                  } else if (index === 2) {
                    router.push("?policy=youth");
                  }
                }}
                isEssential={tosList[index].isEssential}
                isChecked={agreeState}
                onChange={() => {
                  const newAgree = [...agree];
                  newAgree[index] = !newAgree[index];

                  setAgree(newAgree);
                  setIsAllAgree(newAgree.every(Boolean));
                }}
                title={tosList[index].title}
              />
            ))}
          </>
        )}
        {policy && (
          <PolicyDetail
            title={policyDetail?.title || ""}
            contents={policyDetail?.contents || ""}
          />
        )}
      </main>
      {!policy && (
        <BottomButtonTab shadow>
          <Button
            className="flex-1 h-[48px]"
            disabled={!isAllAgree}
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
      )}
    </>
  );
}

const PolicyDetail = ({
  title,
  contents,
}: {
  title: string;
  contents: string;
}) => {
  if (!title || !contents) {
    return <></>;
  }

  return (
    <div>
      <StyledMarkdown className={"prose"}>{contents}</StyledMarkdown>
    </div>
  );
};

const POLICY_TO_IDX = {
  terms: "1",
  privacy: "2",
  youth: "3",
};

const StyledMarkdown = styled(Markdown)(() => ({
  li: {
    listStyle: "inherit",
    listStyleType: "inherit",
  },
}));
