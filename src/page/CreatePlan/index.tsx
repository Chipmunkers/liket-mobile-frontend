"use client";

import { PlanGoogleMap } from "@/page/CreatePlan/_ui/GoogleMap";
import { PlaceSearch } from "@/page/CreatePlan/_ui/PlaceSearch";
import { stackRouterBack } from "@/shared/helpers/stackRouter";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import { InputLabel } from "@/shared/ui/Input";
import InputButton from "@/shared/ui/Input/InputButton";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";

export const CreatePlanPage = () => {
  const router = useRouter();
  const pathName = usePathname();

  const clickHeaderBackBtnEvent = () => {
    const result = confirm(
      "작성된 내용은 저장되지 않습니다. 정말 뒤로가시겠습니까?"
    );

    if (result === true) stackRouterBack(router);
  };

  const clickStartInputEvent = () => {
    router.push(pathName + "?modal=search");
  };

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: { onClick: clickHeaderBackBtnEvent } }} />
        <HeaderMiddle text="루트 짜기" />
      </Header>
      <main>
        <div className="map-area w-full h-[300px] bg-grey-03">
          <PlanGoogleMap />
        </div>
        <div>
          <div className="px-[24px] my-[34px]">
            <InputLabel>출발</InputLabel>
            <InputButton
              placeholder="출발지를 선택해주세요"
              onClick={clickStartInputEvent}
            />
          </div>
        </div>
      </main>
      <PlaceSearch />
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
    </>
  );
};
