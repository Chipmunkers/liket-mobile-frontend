"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import HomeIcon from "@/icons/home.svg";
import FilledHomeIcon from "@/icons/home-filled.svg";
import MapIcon from "@/icons/map.svg";
import FilledMapIcon from "@/icons/map-filled.svg";
import CreateIcon from "@/icons/create.svg";
import FilledCreateIcon from "@/icons/create-filled.svg";
import MyPageIcon from "@/icons/mypage.svg";
import FilledMyPageIcon from "@/icons/mypage-filled.svg";
import { colors } from "@/utils/style";
import { classNames } from "@/utils/helpers";
import { ButtonBase } from "@mui/material";
import { useIsWebView } from "@/shared/hooks/useIsWebview";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { Props } from "./types";
import BottomTabCreateDrawer from "@/widgets/common/BottomTab/ui/BottomTabCreateDrawer";
import useMessageWebview from "@/widgets/common/BottomTab/hooks/useMessageWebview";

const BottomTab = ({ shadow = false }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const isWebview = useIsWebView();

  useMessageWebview(isCreateDrawerOpen, setIsCreateDrawerOpen);

  const buttonStyle = {
    width: "20%",
    height: "44px",
  };

  return (
    <>
      <BottomTabCreateDrawer
        isOpen={isCreateDrawerOpen}
        setIsOpen={setIsCreateDrawerOpen}
      />
      <div className={classNames("bottom-tab z-10", isWebview ? "hidden" : "")}>
        <div
          role="tablist"
          className={classNames(
            "flex w-[100%] justify-around h-[48px] z-[5] items-center bg-white",
            shadow && "shadow-[0px_-8px_16px_0px_rgba(0,0,0,0.04)]"
          )}
        >
          <ButtonBase
            style={buttonStyle}
            onClick={() => {
              if (pathname === "/") return;

              stackRouterPush(router, {
                path: "/",
                screen: WEBVIEW_SCREEN.MAIN,
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
            style={buttonStyle}
            onClick={(e) => {
              if (pathname === "map") return;

              stackRouterPush(router, {
                path: "/map",
                screen: WEBVIEW_SCREEN.MAIN,
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
            style={buttonStyle}
            role="tab"
            aria-selected={isCreateDrawerOpen}
            type="button"
            data-twe-ripple-init
            onClick={() => setIsCreateDrawerOpen(true)}
          >
            {isCreateDrawerOpen ? (
              <FilledCreateIcon color={colors.skyblue["01"]} />
            ) : (
              <CreateIcon color={colors.grey["02"]} />
            )}
          </ButtonBase>
          <ButtonBase
            style={buttonStyle}
            onClick={() => {
              stackRouterPush(router, {
                path: "/mypage",
                screen: WEBVIEW_SCREEN.MAIN,
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

export default BottomTab;
