"use client";

import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderMiddle,
} from "@/shared/ui/Header";
import LiketCard from "./_components/LiketCard";
import { SelectButtonSmall } from "@/shared/ui/SelectButton";
import { useEffect, useState } from "react";
import SmallDownArrow from "@/shared/icon/common/arrow/DownArrowSmall.svg";
import { useRouter, useSearchParams } from "next/navigation";
import useHandleResizeScreen from "@/widgets/content/ContentInfiniteGroup/hooks/useHandleResizeScreen";
import ButtonBase from "@mui/material/ButtonBase";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import useModalStore from "@/shared/store/modalStore";
import Drawer from "@/shared/ui/Drawer";
import { useGetLiketAll } from "./_hooks/useGetLiketAll";
import { useGetMyInfo } from "@/shared/hooks/useGetMyInfo";
import { useDeleteLiket } from "./_hooks/useDeleteLiket";
import customToast from "@/shared/helpers/customToast";
import useMoveLoginPage from "@/shared/hooks/useMoveLoginPage";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function Page() {
  const queryClient = useQueryClient();

  const searchParam = useSearchParams();
  const { data: userInfo } = useGetMyInfo();
  const order = searchParam.get("order") || "desc";
  const [isNarrow, setIsNarrow] = useState(false);
  const router = useRouter();
  const [selectedLiket, setSelectedLiket] = useState("");
  const openModal = useModalStore(({ openModal }) => openModal);
  const { data, isFetching, refetch, error } = useGetLiketAll(
    userInfo?.idx?.toString() || "",
    {
      order: "desc",
      orderby: "time",
    }
  );

  const moveLoginPage = useMoveLoginPage();

  const { mutate: deleteLiket } = useDeleteLiket({
    onSuccess: () => {
      customToast("삭제되었습니다.");
      setSelectedLiket("");
      resetLikets();
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) return moveLoginPage();
        if (err.response?.status === 404) {
          customToast("삭제되었습니다.");
          setSelectedLiket("");
          resetLikets();
          return;
        }
      }

      customToast("예상하지 못한 에러가 발생했습니다. 다시 시도해주세요.");
    },
  });

  useHandleResizeScreen(setIsNarrow);

  useEffect(() => {
    return () => resetLikets();
  }, []);

  // * 리뷰 무한 스크롤 초기화
  const resetLikets = () => {
    queryClient.removeQueries({
      queryKey: [`content-liket-${userInfo?.idx || ""}`],
    });

    queryClient.setQueryData(
      [
        `content-likets`,
        {
          order: "desc",
          orderby: "time",
        },
      ],
      {
        pages: [],
        pageParams: [],
      }
    );
  };

  return (
    <>
      <Header>
        <HeaderLeft
          option={{
            back: true,
          }}
        />
        <HeaderMiddle text="나의 라이켓" />
        <HeaderRight
          option={{
            create: {
              onClick: () => {
                router.push("/create/liket/review-select");
              },
            },
          }}
        />
      </Header>
      <main>
        <div className="flex justify-end px-[24px] my-[8px]">
          <SelectButtonSmall
            rippleEffect={false}
            withBorder={false}
            placeholder={order === "desc" ? "최신순" : "오래된순"}
            className="text-button3"
            text=""
            onClick={() => {
              router.replace(
                `/likets?order=${order === "desc" ? "asc" : "desc"}`
              );
            }}
            Icon={<SmallDownArrow />}
          />
        </div>

        <ul className="flex flex-wrap gap-[14px] px-[24px] pb-[14px]">
          {data &&
            data.pages
              .map((page) => page.liketList)
              .flat()
              .map((liket) => {
                return (
                  <li key={liket.idx} className={"w-[calc(50%-7px)]"}>
                    <LiketCard
                      id={liket.idx}
                      key={liket.idx}
                      {...liket}
                      isNarrow={isNarrow}
                      onClickMeatball={() => setSelectedLiket(liket.idx)}
                    />
                  </li>
                );
              })}
        </ul>
      </main>
      <Drawer open={!!selectedLiket} onClose={() => setSelectedLiket("")}>
        <li className="bottom-sheet-list">
          <ButtonBase
            onClick={() => {
              stackRouterPush(router, {
                path: `/edit/liket?liket=${selectedLiket}`,
                screen: WEBVIEW_SCREEN.EDIT_LIKET,
              });
            }}
            className="bottom-sheet-button flex justify-start px-[24px]"
          >
            수정하기
          </ButtonBase>
        </li>
        <li className="bottom-sheet-list">
          <ButtonBase
            onClick={() => {
              openModal("DeleteModal", {
                onClickPositive() {
                  deleteLiket(+selectedLiket);
                },
              });
            }}
            className="bottom-sheet-button flex justify-start px-[24px] text-rosepink-01"
          >
            삭제
          </ButtonBase>
        </li>
      </Drawer>
    </>
  );
}
