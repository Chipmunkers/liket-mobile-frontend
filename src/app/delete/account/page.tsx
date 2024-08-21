"use client";

import BottomButtonTabWrapper from "@/components/BottomButtonTabWrapper";
import Button from "@/components/Button";
import ButtonGroup from "@/components/ButtonGroup";
import CheckBoxWithLink from "@/components/CheckboxWithLink";
import Header from "@/components/Header";
import { InputWrapper, Label } from "@/components/newInput";
import { useDeleteAccount } from "@/service/delete";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setAuthToken } from "@/shared/helpers/axios";
import authStore from "@/stores/authStore";
import { useQueryClient } from "@tanstack/react-query";
import customToast from "../../../utils/customToast";
import LeftOption from "@/components/Header/LeftOption";
import MiddleText from "@/components/Header/MiddleText";
import {
  ScreenTYPE,
  stackRouterBack,
  stackRouterPush,
} from "../../../utils/stackRouter";

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
        screen: ScreenTYPE.MAIN,
        isStack: false,
      });
    },
    onError: () => {
      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
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
        <LeftOption option={{ back: true }} />
        <MiddleText text="회원탈퇴" />
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
              <CheckBoxWithLink
                isChecked={selectedIndex === 1}
                onChangeCheckbox={() => handleChangeCheckbox(1)}
                onClickListItem={() => {}}
              >
                앱 사용이 불편해요.
              </CheckBoxWithLink>
              <CheckBoxWithLink
                isChecked={selectedIndex === 2}
                onChangeCheckbox={() => handleChangeCheckbox(2)}
                onClickListItem={() => {}}
              >
                사용하지 않는 앱이에요.
              </CheckBoxWithLink>
              <CheckBoxWithLink
                isChecked={selectedIndex === 3}
                onChangeCheckbox={() => handleChangeCheckbox(3)}
                onClickListItem={() => {}}
              >
                컨텐츠가 별로 없어요.
              </CheckBoxWithLink>
              <CheckBoxWithLink
                isChecked={selectedIndex === 4}
                onChangeCheckbox={() => handleChangeCheckbox(4)}
                onClickListItem={() => {}}
              >
                다른 서비스를 이용해요.
              </CheckBoxWithLink>
              <CheckBoxWithLink
                isChecked={selectedIndex === 5}
                onChangeCheckbox={() => handleChangeCheckbox(5)}
                onClickListItem={() => {}}
              >
                다른 계정이 있거나, 재가입할 거에요.
              </CheckBoxWithLink>
              <CheckBoxWithLink
                isChecked={selectedIndex === 6}
                onChangeCheckbox={() => handleChangeCheckbox(6)}
                onClickListItem={() => {
                  handleChangeCheckbox(6);
                }}
              >
                기타
              </CheckBoxWithLink>
            </div>
            <InputWrapper margin="8px 0 0 0">
              <Label
                htmlFor="detail-info"
                maxLength={200}
                currentLength={text.length}
              />
              <TextareaAutosize
                value={text}
                maxLength={200}
                onChange={(e) => setText(e.target.value)}
                placeholder="다른 이유나 자세한 이유가 있다면 알려주세요."
                className="w-[100%] mb-[34px] min-h-[132px] h-[auto] overflow-y-hidden px-[8px] py-[16px] mt-[8px] placeholder:text-body3 placeholder:text-grey-02 border-y-[1px] focus:outline-none focus:ring-0"
              />
            </InputWrapper>
          </form>
        </div>
        <BottomButtonTabWrapper shadow>
          <ButtonGroup gap={16}>
            <Button
              height={48}
              onClick={() => {
                stackRouterBack(router);
              }}
              variant="ghost"
              fullWidth
            >
              취소
            </Button>
            <Button
              disabled={selectedIndex === -1}
              height={48}
              onClick={() => handleSubmit()}
              fullWidth
            >
              탈퇴하기
            </Button>
          </ButtonGroup>
        </BottomButtonTabWrapper>
      </main>
    </>
  );
}
