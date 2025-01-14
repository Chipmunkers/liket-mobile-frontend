"use client";

import { PlanGoogleMap } from "@/page/CreatePlan/_ui/GoogleMap";
import { PlaceSearch } from "@/page/CreatePlan/_ui/PlaceSearch";
import { useButtonClickEvent } from "@/page/CreatePlan/hooks/useButtonClickEvent";
import { useGetLoginCheck } from "@/page/CreatePlan/hooks/useGetLoginCheck";
import { useGetUtils } from "@/page/CreatePlan/hooks/useGetUtils";
import { Place } from "@/page/CreatePlan/type";
import Button from "@/shared/ui/Button";
import { Header, HeaderLeft, HeaderMiddle } from "@/shared/ui/Header";
import { InputLabel } from "@/shared/ui/Input";
import InputButton from "@/shared/ui/Input/InputButton";
import { useState } from "react";
import DeleteCrossIcon from "@/shared/icon/common/cross/ImgDeleteCrossIcon.svg";

export const CreatePlanPage = () => {
  useGetLoginCheck();
  const {
    extractTitleOrPlace,
    formatSecondToTimeString,
    getInputTitle,
    getInputType,
  } = useGetUtils();

  const [placeList, setPlaceList] = useState<(Place | null)[]>([null]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    clickHeaderBackBtnEvent,
    clickAddStopoverBtnEvent,
    clickDeleteStopoverBtnEvent,
    clickPlaceAddInputBtnEvent,
  } = useButtonClickEvent({
    placeList,
    setPlaceList,
    setSelectedIndex,
  });

  return (
    <>
      <Header>
        <HeaderLeft option={{ back: { onClick: clickHeaderBackBtnEvent } }} />
        <HeaderMiddle text="루트 짜기" />
      </Header>
      <main>
        <div className="map-area w-full h-[300px] bg-grey-03">
          <PlanGoogleMap placeList={placeList} />
        </div>
        <div className="mb-[34px]">
          {placeList.map((elem, i) => (
            <>
              <div className="px-[24px] my-[34px]" key={`stopover-input-${i}`}>
                <InputLabel className="flex h-[16px]">
                  {getInputTitle(i, placeList.length)}
                  {getInputType(i, placeList.length) !== "origin" && (
                    <button
                      className="w-[16px] h-[16px] rounded-full flex justify-center items-center bg-grey-02 ml-[4px]"
                      onClick={() => clickDeleteStopoverBtnEvent(i)}
                    >
                      <DeleteCrossIcon className="scale-[68%]" />
                    </button>
                  )}
                </InputLabel>
                <InputButton
                  placeholder="경유지를 선택해주세요."
                  text={
                    (placeList[i] && extractTitleOrPlace(placeList[i])) ||
                    undefined
                  }
                  onClick={() => clickPlaceAddInputBtnEvent(i)}
                />
              </div>
            </>
          ))}

          <div className="px-[24px] h-[40px]">
            <Button
              className="w-full h-full"
              variant="ghost"
              onClick={clickAddStopoverBtnEvent}
            >
              <span className="text-body3">경유지 추가</span>
            </Button>
          </div>
        </div>
      </main>
      <PlaceSearch setPlaceList={setPlaceList} i={selectedIndex} />
    </>
  );
};
