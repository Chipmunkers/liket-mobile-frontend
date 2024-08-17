"use client";

import BottomButtonTabWrapper from "@/components/BottomButtonTabWrapper";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import CheckBoxWithLink from "@/components/CheckboxWithLink";
import Divider from "@/components/Divider";
import Header from "@/components/Header";
import { useGetDetailTos, useGetTosList } from "@/service/terms/hooks";
import { classNames } from "@/utils/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";
import {
  ScreenTYPE,
  stackRouterBack,
  stackRouterPush,
} from "../../utils/stackRouter";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [agree, setAgree] = useState({
    "youth-protection": false,
    usage: false,
    privacy: false,
  });
  const isTownSelectionModalOpen = searchParams.get("termIdx");
  const [detailTosIdx, setDetailTosIdx] = useState<number | undefined>();
  const { data: tosListData } = useGetTosList();
  const { data: detailTosData } = useGetDetailTos({
    tosIdx: detailTosIdx,
  });

  if (!tosListData) {
    return null;
  }

  const handleChangeCheckbox = (
    term: "youth-protection" | "usage" | "privacy",
    isChecked: boolean
  ) => setAgree({ ...agree, [term]: isChecked });

  const { tosList } = tosListData;
  const isAllAgreed = Object.values(agree).every((isAgree) => isAgree);

  return (
    <>
      <Header>
        <LeftOption
          option={{
            close: {
              onClick: () => stackRouterBack(router),
            },
          }}
        />
        <MiddleText text="로그인" />
      </Header>
      <main className="px-[24px] pt-[15px]">
        <div className="my-[8px]">
          <Checkbox
            label="전체 약관동의"
            size="14px"
            isBoard
            isChecked={isAllAgreed}
            onChange={() => {
              const isAllAgree = Object.values(agree).every(
                (isAgree) => isAgree
              );

              if (isAllAgree) {
                setAgree({
                  "youth-protection": false,
                  usage: false,
                  privacy: false,
                });
              } else {
                setAgree({
                  "youth-protection": true,
                  usage: true,
                  privacy: true,
                });
              }
            }}
            marginBetweenTextAndCheckbox="8px"
          />
        </div>
        <Divider width="100%" height="1px" margin="0 0 16px 0" />
        {tosList.map(({ title, idx }) => {
          return (
            <div className="my-[8px]" key={idx}>
              <CheckBoxWithLink
                isChecked={agree["youth-protection"]}
                onChangeCheckbox={(isChecked) =>
                  handleChangeCheckbox("youth-protection", isChecked)
                }
                onClickListItem={() => {
                  stackRouterPush(router, {
                    path: `${pathname}?termIdx=${idx}`,
                    screen: ScreenTYPE.TERMS_DETAIL,
                  });
                  setDetailTosIdx(idx);
                }}
              >
                {`[필수] ${title}`}
              </CheckBoxWithLink>
            </div>
          );
        })}
      </main>
      <BottomButtonTabWrapper shadow>
        <Button
          fullWidth
          height={48}
          disabled={!isAllAgreed}
          onClick={() =>
            stackRouterPush(router, {
              path: "/signup/social",
              screen: ScreenTYPE.SOCIAL_SIGNUP,
            })
          }
        >
          다음
        </Button>
      </BottomButtonTabWrapper>
      <div
        className={classNames(
          "full-modal",
          !isTownSelectionModalOpen && "hidden"
        )}
      >
        <Header>
          <LeftOption
            option={{
              back: {
                onClick: () => {
                  setDetailTosIdx(undefined);
                  stackRouterBack(router);
                },
              },
            }}
          />
          <MiddleText text={detailTosData?.title || ""} />
        </Header>
        <div className="full-modal-main">
          <div className="flex grow h-[100%]">
            <div>{detailTosData?.contents}</div>
          </div>
        </div>
      </div>
    </>
  );
}
