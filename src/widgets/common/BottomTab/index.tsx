"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HomeIcon from "@/icons/home.svg";
import FilledHomeIcon from "@/icons/home-filled.svg";
import MapIcon from "@/icons/map.svg";
import FilledMapIcon from "@/icons/map-filled.svg";
import CreateIcon from "@/icons/create.svg";
import FilledCreateIcon from "@/icons/create-filled.svg";
import MyPageIcon from "@/icons/mypage.svg";
import FilledMyPageIcon from "@/icons/mypage-filled.svg";
import { ButtonBase } from "@mui/material";
import { useIsWebView } from "@/shared/hooks/useIsWebview";
import { Props } from "./types";
import BottomTabCreateDrawer from "@/widgets/common/BottomTab/ui/BottomTabCreateDrawer";
import useMessageWebview from "@/widgets/common/BottomTab/hooks/useMessageWebview";
import { colors } from "@/shared/style/color";
import { classNames } from "@/shared/helpers/classNames";
import useGetClickEvent from "./hooks/useGetClickEvent";
import { setAppNavBack } from "@/shared/helpers/setAppNavState";

const BottomTab = ({ shadow = false }: Props) => {
  //
  const pathname = usePathname();
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const isWebview = useIsWebView();

  const { mainButtonClickEvent, mapButtonClickEvent, mypageButtonClickEvent } =
    useGetClickEvent();

  useMessageWebview({
    mainButtonClickEvent,
    createButtonClickEvent: () => setIsCreateDrawerOpen(true),
  });

  useEffect(() => {
    setAppNavBack(isCreateDrawerOpen);
  }, [isCreateDrawerOpen]);

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
      <div className={classNames("bottom-tab z-10", isWebview && "hidden")}>
        <div
          role="tablist"
          className={classNames(
            "flex w-[100%] justify-around h-[48px] z-[5] items-center bg-white",
            shadow && "shadow-[0px_-8px_16px_0px_rgba(0,0,0,0.04)]"
          )}
        >
          <ButtonBase
            style={buttonStyle}
            className="icon-button"
            disableRipple={true}
            onClick={mainButtonClickEvent}
          >
            {pathname === "/" ? (
              <FilledHomeIcon color={colors.skyblue["01"]} />
            ) : (
              <HomeIcon color={colors.grey["02"]} />
            )}
          </ButtonBase>
          <ButtonBase
            style={buttonStyle}
            disableRipple={true}
            className="icon-button"
            onClick={mapButtonClickEvent}
          >
            {pathname === "/map" ? (
              <FilledMapIcon color={colors.skyblue["01"]} />
            ) : (
              <MapIcon color={colors.grey["02"]} />
            )}
          </ButtonBase>
          <ButtonBase
            style={buttonStyle}
            disableRipple={true}
            className="icon-button"
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
            disableRipple
            className="icon-button"
            onClick={mypageButtonClickEvent}
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
