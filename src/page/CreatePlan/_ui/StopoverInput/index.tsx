import { useGetUtils } from "@/page/CreatePlan/hooks/useGetUtils";
import DeleteCrossIcon from "@/shared/icon/common/cross/ImgDeleteCrossIcon.svg";
import { InputLabel } from "@/shared/ui/Input";
import InputButton from "@/shared/ui/Input/InputButton";
import { Props } from "./type";
import { useButtonClickEvent } from "@/page/CreatePlan/hooks/useButtonClickEvent";
import { useEffect, useState } from "react";
import { Route } from "@/page/CreatePlan/type";
import { usePlaceRoute } from "@/page/CreatePlan/_ui/StopoverInput/hooks/usePlaceRoute";

export const StopoverInput = ({
  i,
  placeList,
  setPlaceList,
  setSelectedIndex,
  routeSegmentList,
  routeList,
  setRouteList,
}: Props) => {
  const {
    extractTitleOrPlace,
    formatSecondToTimeString,
    getInputTitle,
    getInputType,
  } = useGetUtils();

  const { clickDeleteStopoverBtnEvent, clickPlaceAddInputBtnEvent } =
    useButtonClickEvent({
      placeList,
      setPlaceList,
      setSelectedIndex,
    });

  usePlaceRoute({
    i,
    routeList,
    routeSegmentList,
    setRouteList,
  });

  return (
    <div className="px-[24px] my-[34px]">
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
        placeholder="장소를 선택해주세요."
        text={(placeList[i] && extractTitleOrPlace(placeList[i])) || undefined}
        onClick={() => clickPlaceAddInputBtnEvent(i)}
      />
      {routeList[i] && (
        <div className="flex items-center mt-[24px]">
          <div className="h-[60px] w-[2px] bg-grey-02"></div>
          <div className="ml-[24px] text-body3 text-grey-04">
            {routeList[i].type === "transit" ? "대중교통: " : "도보: "}
            {formatSecondToTimeString(routeList[i].totalTime)}
          </div>
        </div>
      )}
    </div>
  );
};
