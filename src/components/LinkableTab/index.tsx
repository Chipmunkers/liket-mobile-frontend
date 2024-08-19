"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HomeIcon from "@/icons/home.svg";
import FilledHomeIcon from "@/icons/home-filled.svg";
import MapIcon from "@/icons/map.svg";
import FilledMapIcon from "@/icons/map-filled.svg";
import CreateIcon from "@/icons/create.svg";
import FilledCreateIcon from "@/icons/create-filled.svg";
import MyPageIcon from "@/icons/mypage.svg";
import FilledMyPageIcon from "@/icons/mypage-filled.svg";
import { colors } from "@/utils/style";
import CreateReview from "@/icons/create-review.svg";
import CreateLiket from "@/icons/create-liket.svg";
import CreateRoute from "@/icons/create-route.svg";
import { classNames } from "@/utils/helpers";
import CustomDrawer from "../CustomDrawer";
import customToast from "@/utils/customToast";
import { ButtonBase } from "@mui/material";
import {
  ScreenTYPE,
  stackRouterPush,
  WebViewEventType,
} from "../../utils/stackRouter";
import { useIsWebView } from "../../hooks/useIsWebView";
import { setAppNavBack } from "../../utils/setAppNavState";

interface Props {
  shadow?: boolean;
}

const LinkableTab = ({ shadow = false }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const isLoggedIn = false;

  const messageEvent = (e: MessageEvent) => {
    const data: { type: string; click: string } = JSON.parse(e.data);
    if (data.type === WebViewEventType.CLICK) {
      if (data.click === "nav-create-button") {
        setIsWriteModalOpen(true);
      }
    }
  };

  useEffect(() => {
    // ios
    window.addEventListener("message", messageEvent);

    // android
    //document.addEventListener("message", (e) => alert(e.data));

    return () => window.removeEventListener("message", messageEvent);
  });

  const isWebview = useIsWebView();

  useEffect(() => {
    setAppNavBack(isWriteModalOpen);
  }, [isWriteModalOpen]);

  return (
    <>
      <CustomDrawer
        open={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
      >
        <div className="center text-h2">Create</div>
        <ul>
          <li className="bottom-sheet-list">
            {isLoggedIn ? (
              <Link href="/create/review" className="bottom-sheet-button">
                <CreateReview className="mr-[8px]" />
                리뷰 작성
              </Link>
            ) : (
              <ButtonBase
                onClick={() => {
                  stackRouterPush(router, {
                    path: "/create/review",
                    screen: ScreenTYPE.CREATE_REVIEW,
                  });
                }}
                className="bottom-sheet-button flex justify-start px-[24px]"
              >
                <CreateReview className="mr-[8px]" />
                리뷰 작성
              </ButtonBase>
            )}
          </li>
          <li className="bottom-sheet-list">
            <ButtonBase
              onClick={() => {
                if (isWebview) {
                  router.push("/create/liket");
                } else {
                  customToast("모바일 앱에서만 사용이 가능해요.");
                }
              }}
              className="bottom-sheet-button flex justify-start px-[24px]"
            >
              <CreateLiket className="mr-[8px]" />
              라이켓 제작
            </ButtonBase>
            {/* {isLoggedIn ? (
              <Link href="/create/liket" className="bottom-sheet-button">
                <CreateLiket className="mr-[8px]" />
                라이켓 제작
              </Link>
            ) : (
              <button
                onClick={() => {
                  openModal("LoginModal", {
                    onClickPositive: () => {
                      router.push("/create/liket");
                    },
                  });
                }}
                className="bottom-sheet-button"
              >
                <CreateLiket className="mr-[8px]" />
                라이켓 제작
              </button>
            )} */}
          </li>
          <li className="bottom-sheet-list">
            <ButtonBase
              onClick={() => {
                customToast("추후에 출시 예정인 기능이에요.");
              }}
              className="bottom-sheet-button flex justify-start px-[24px]"
            >
              <CreateRoute className="mr-[8px]" />
              루트 짜기
            </ButtonBase>
            {/* {isLoggedIn ? (
              <Link href="/create/route" className="bottom-sheet-button">
                <CreateRoute className="mr-[8px]" />
                루트 짜기
              </Link>
            ) : (
              <button
                onClick={() => {
                  openModal("LoginModal", {
                    onClickPositive: () => {
                      router.push("/create/route");
                    },
                  });
                }}
                className="bottom-sheet-button"
              >
                <CreateRoute className="mr-[8px]" />
                루트 짜기
              </button>
            )} */}
          </li>
        </ul>
      </CustomDrawer>
      <div className={classNames("bottom-tab z-10", isWebview ? "hidden" : "")}>
        <div
          role="tablist"
          className={classNames(
            "flex w-[100%] justify-around h-[48px] z-[5] items-center bg-white",
            shadow && "shadow-[0px_-8px_16px_0px_rgba(0,0,0,0.04)]"
          )}
        >
          <ButtonBase
            className="w-[20%] h-[44px]"
            onClick={() => {
              if (pathname === "/") return;

              stackRouterPush(router, {
                path: "/",
                screen: ScreenTYPE.MAIN,
                isStack: false,
                moveScreen: false,
              });
            }}
          >
            {pathname === "/" ? (
              <FilledHomeIcon color={colors.skyblue["01"]} />
            ) : (
              <HomeIcon color={colors.grey["02"]} />
            )}
          </ButtonBase>
          <ButtonBase
            className="w-[20%] h-[44px]"
            onClick={(e) => {
              if (pathname === "map") return;

              stackRouterPush(router, {
                path: "/map",
                screen: ScreenTYPE.MAIN,
                moveScreen: false,
              });
            }}
          >
            {pathname === "/map" ? (
              <FilledMapIcon color={colors.skyblue["01"]} />
            ) : (
              <MapIcon color={colors.grey["02"]} />
            )}
          </ButtonBase>
          <ButtonBase
            role="tab"
            aria-selected={isWriteModalOpen}
            type="button"
            data-twe-ripple-init
            className="w-[20%] h-[44px]"
            onClick={() => setIsWriteModalOpen(true)}
          >
            {isWriteModalOpen ? (
              <FilledCreateIcon color={colors.skyblue["01"]} />
            ) : (
              <CreateIcon color={colors.grey["02"]} />
            )}
          </ButtonBase>
          <ButtonBase
            className={`w-[20%] h-[44px]`}
            onClick={() => {
              stackRouterPush(router, {
                path: "/mypage",
                screen: ScreenTYPE.MAIN,
                isStack: false,
                moveScreen: false,
              });
            }}
          >
            {pathname === "/mypage" ? (
              <FilledMyPageIcon color={colors.skyblue["01"]} />
            ) : (
              <MyPageIcon color={colors.grey["02"]} />
            )}
          </ButtonBase>
        </div>
      </div>
    </>
  );
};

export default LinkableTab;
