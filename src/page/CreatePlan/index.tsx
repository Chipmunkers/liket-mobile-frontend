"use client";

import { PlanGoogleMap } from "@/page/CreatePlan/_ui/GoogleMap";
import { PlaceSearch } from "@/page/CreatePlan/_ui/PlaceSearch";
import { ModalType } from "@/page/CreatePlan/_ui/PlaceSearch/type";
import { useGetLoginCheck } from "@/page/CreatePlan/hooks/useGetLoginCheck";
import { useGetPedestrianRoute } from "@/page/CreatePlan/hooks/useGetPedestrianRoute";
import { useGetUtils } from "@/page/CreatePlan/hooks/useGetUtils";
import { Place } from "@/page/CreatePlan/type";
import { stackRouterBack } from "@/shared/helpers/stackRouter";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import { InputLabel } from "@/shared/ui/Input";
import InputButton from "@/shared/ui/Input/InputButton";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export const CreatePlanPage = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { extractTitleOrPlace } = useGetUtils();

  const [searchModalType, setSearchModalType] = useState<ModalType>("origin");

  const [origin, setOrigin] = useState<Place>();
  const [stopoverList, setStopoverList] = useState<Place[]>([]);
  const [destination, setDestination] = useState<Place>();

  const { data: pedestrianRoute } = useGetPedestrianRoute(
    origin,
    stopoverList,
    destination
  );

  useGetLoginCheck();

  const clickHeaderBackBtnEvent = () => {
    const result = confirm(
      "작성된 내용은 저장되지 않습니다. 정말 뒤로가시겠습니까?"
    );

    if (result === true) stackRouterBack(router);
  };

  const clickOriginInputEvent = () => {
    setSearchModalType("origin");
    router.push(pathName + "?modal=search");
  };

  const clickDestinationInputEvent = () => {
    setSearchModalType("destination");
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
          <PlanGoogleMap
            pedestrianRoute={pedestrianRoute}
            origin={origin}
            destination={destination}
            stopoverList={stopoverList}
          />
        </div>
        <div>
          <div className="px-[24px] my-[34px]">
            <InputLabel>출발</InputLabel>
            <InputButton
              placeholder="출발지를 선택해주세요"
              text={origin && extractTitleOrPlace(origin)}
              onClick={clickOriginInputEvent}
            />
          </div>
          <div className="px-[24px] my-[34px]">
            <InputLabel>도착</InputLabel>
            <InputButton
              placeholder="도착지를 입력해주세요"
              text={destination && extractTitleOrPlace(destination)}
              onClick={clickDestinationInputEvent}
            />
          </div>
        </div>
      </main>
      <PlaceSearch
        setStopover={setStopoverList}
        setOrigin={setOrigin}
        setDestination={setDestination}
        type={searchModalType}
      />
    </>
  );
};
