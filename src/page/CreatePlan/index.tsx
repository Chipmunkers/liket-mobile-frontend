"use client";

import { PlanGoogleMap } from "@/page/CreatePlan/_ui/GoogleMap";
import { PlaceSearch } from "@/page/CreatePlan/_ui/PlaceSearch";
import { ModalType } from "@/page/CreatePlan/_ui/PlaceSearch/type";
import { useGetUtils } from "@/page/CreatePlan/hooks/useGetUtils";
import { stackRouterBack } from "@/shared/helpers/stackRouter";
import { KeywordSearchDocumentEntity } from "@/shared/types/api/address/KeywordSearchDocumentEntity";
import { SummaryContentEntity } from "@/shared/types/api/content/SummaryContentEntity";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import { InputLabel } from "@/shared/ui/Input";
import InputButton from "@/shared/ui/Input/InputButton";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const CreatePlanPage = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { extractTitleOrPlace, isContent } = useGetUtils();

  const [searchModalType, setSearchModalType] = useState<ModalType>("origin");

  const [origin, setOrigin] = useState<
    SummaryContentEntity | KeywordSearchDocumentEntity
  >();
  const [stopovers, setStopovers] = useState<
    (SummaryContentEntity | KeywordSearchDocumentEntity)[]
  >([]);
  const [destination, setDestination] = useState<
    SummaryContentEntity | KeywordSearchDocumentEntity
  >();

  const clickHeaderBackBtnEvent = () => {
    const result = confirm(
      "작성된 내용은 저장되지 않습니다. 정말 뒤로가시겠습니까?"
    );

    if (result === true) stackRouterBack(router);
  };

  const clickStartInputEvent = () => {
    setSearchModalType("origin");
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
              text={origin && extractTitleOrPlace(origin)}
              onClick={clickStartInputEvent}
            />
          </div>
        </div>
      </main>
      <PlaceSearch
        setStopover={setStopovers}
        setOrigin={setOrigin}
        setDestination={setDestination}
        type={searchModalType}
      />
    </>
  );
};
