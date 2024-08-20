"use client";

import Drawer from "@/shared/ui/Drawer";
import { Props } from "./types";
import { stackRouterPush } from "@/shared/helpers/stackRouter";
import CreateReview from "@/icons/create-review.svg";
import CreateLiket from "@/icons/create-liket.svg";
import CreateRoute from "@/icons/create-route.svg";
import { useRouter } from "next/navigation";
import { WEBVIEW_SCREEN } from "@/shared/consts/webview/screen";
import { useIsWebView } from "@/shared/hooks/useIsWebview";
import customToast from "@/shared/helpers/customToast";
import DrawerItem from "@/entities/common/DrawerItem";

const BottomTabCreateDrawer = ({ isOpen, setIsOpen }: Props) => {
  const router = useRouter();
  const isWebview = useIsWebView();

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="center text-h2">Create</div>
      <ul>
        <DrawerItem
          onClick={() => {
            stackRouterPush(router, {
              path: "/create/review",
              screen: WEBVIEW_SCREEN.CREATE_REVIEW,
            });
          }}
        >
          <CreateReview className="mr-[8px]" />
          리뷰 작성
        </DrawerItem>
        <DrawerItem
          onClick={() => {
            if (isWebview) {
              router.push("/create/liket");
            } else {
              customToast("모바일 앱에서만 사용이 가능해요.");
            }
          }}
        >
          <CreateLiket className="mr-[8px]" />
          라이켓 제작
        </DrawerItem>
        <DrawerItem
          onClick={() => {
            customToast("열심히 준비중입니다!");
          }}
        >
          <CreateRoute className="mr-[8px]" />
          루트 짜기
        </DrawerItem>
      </ul>
    </Drawer>
  );
};

export default BottomTabCreateDrawer;
