"use client";

import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setAuthToken } from "@/shared/helpers/axios";
import { useQueryClient } from "@tanstack/react-query";
import authStore from "@/shared/store/authStore";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import CheckBox from "@/shared/ui/CheckBox";
import { InputLabel } from "@/shared/ui/Input";
import { stackRouterBack, stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import customToast from "@/shared/helpers/customToast";
import BottomButtonTab from "@/shared/ui/BottomButtonTab";
import Button from "@/shared/ui/Button";
import { useDeleteAccount } from "./_hooks/useDeleteAccount";

export default function Page() {
  const queryClient = useQueryClient();
  const setToken = authStore(({ setToken }) => setToken);
  const { mutate } = useDeleteAccount({
    onSuccess: () => {
      queryClient.invalidateQueries();
      setAuthToken("");
      setToken("");
      stackRouterPush(router, {
        path: "/",
        screen: WEBVIEW_SCREEN.MAIN,
        isStack: false,
      });
    },
  });
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [text, setText] = useState("");
  const router = useRouter();

  const handleChangeCheckbox = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSubmit = () =>
    mutate({
      type: selectedIndex,
      contents: text,
    });

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: true }} />
        <HeaderMiddle text="회원탈퇴" />
      </Header>
      <main>
        <div className="px-[24px] mt-[24px]">
          <h2>라이켓을 떠나시나요..? 😞</h2>
          <div className="text-body5 text-grey-04 pt-[4px]">
            계정을 삭제하면 작성하신 리뷰, 라이켓, 루트 모든 정보가 삭제됩니다.
            탈퇴 사유를 알려주시면 더 나은 라이켓이 되도록 노력하겠습니다.
          </div>
          <form className="grow">
            <div className="mt-[24px] flex flex-col gap-[16px]">
              <CheckBox
                isChecked={selectedIndex === 1}
                onChange={() => handleChangeCheckbox(1)}
                label="앱 사용이 불편해요"
                labelClassName="text-body3 text-grey-black"
                marginBetweenTextAndCheckbox="8px"
              />
              <CheckBox
                isChecked={selectedIndex === 2}
                onChange={() => handleChangeCheckbox(2)}
                label="사용하지 않는 앱이에요."
                labelClassName="text-body3 text-grey-black"
                marginBetweenTextAndCheckbox="8px"
              />
              <CheckBox
                isChecked={selectedIndex === 3}
                onChange={() => handleChangeCheckbox(3)}
                label="컨텐츠가 별로 없어요."
                labelClassName="text-body3 text-grey-black"
                marginBetweenTextAndCheckbox="8px"
              />
              <CheckBox
                isChecked={selectedIndex === 4}
                onChange={() => handleChangeCheckbox(4)}
                label="다른 서비스를 이용해요."
                labelClassName="text-body3 text-grey-black"
                marginBetweenTextAndCheckbox="8px"
              />
              <CheckBox
                isChecked={selectedIndex === 5}
                onChange={() => handleChangeCheckbox(5)}
                label="다른 계정이 있거나, 재가입할 거에요."
                labelClassName="text-body3 text-grey-black"
                marginBetweenTextAndCheckbox="8px"
              />
              <CheckBox
                isChecked={selectedIndex === 6}
                onChange={() => handleChangeCheckbox(6)}
                label="기타"
                labelClassName="text-body3 text-grey-black"
                marginBetweenTextAndCheckbox="8px"
              />
            </div>
            <div className="mt-[8px]">
              <InputLabel
                htmlFor="detail-info"
                maxLength={200}
                currentLength={text.length}
              >
                {""}
              </InputLabel>
              <TextareaAutosize
                value={text}
                maxLength={200}
                onChange={(e) => setText(e.target.value)}
                placeholder="다른 이유나 자세한 이유가 있다면 알려주세요."
                className="w-[100%] mb-[34px] min-h-[132px] h-[auto] overflow-y-hidden px-[8px] py-[16px] mt-[8px] placeholder:text-body3 placeholder:text-grey-02 border-y-[1px] focus:outline-none focus:ring-0"
              />
            </div>
          </form>
        </div>
        <BottomButtonTab shadow>
          <Button
            className="flex-1 h-[48px] mr-[16px]"
            onClick={() => {
              stackRouterBack(router);
            }}
            variant="ghost"
          >
            취소
          </Button>
          <Button
            className="flex-1 h-[48px]"
            disabled={selectedIndex === -1}
            onClick={() => handleSubmit()}
          >
            탈퇴하기
          </Button>
        </BottomButtonTab>
      </main>
    </>
  );
}
