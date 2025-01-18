import { useGetUtils } from "@/page/CreatePlan/hooks/useGetUtils";
import DeleteCrossIcon from "@/shared/icon/common/cross/ImgDeleteCrossIcon.svg";
import { InputLabel } from "@/shared/ui/Input";
import InputButton from "@/shared/ui/Input/InputButton";
import { Props } from "./type";
import { useButtonClickEvent } from "@/page/CreatePlan/hooks/useButtonClickEvent";
import { usePlaceRoute } from "@/page/CreatePlan/_ui/StopoverInput/hooks/usePlaceRoute";
import Button from "@/shared/ui/Button";
import DefaultImg from "@/shared/ui/DefaultImg";
import { DateTimePicker, TimePicker } from "@mui/x-date-pickers";

export const StopoverInput = ({
  i,
  placeList,
  setPlaceList,
  setSelectedIndex,
  routeSegmentList,
  routeList,
  setRouteList,
  setRouteSegmentList,
}: Props) => {
  const {
    extractTitleOrPlace,
    formatSecondToTimeString,
    getInputTitle,
    getInputType,
    isContent,
    extractImgPath,
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

  const typeChangeButtonClickEvent = (type: "transit" | "walking") => {
    const tempRouteSegmentList = routeSegmentList;

    if (!tempRouteSegmentList[i]) return;

    const routeSegment = { ...tempRouteSegmentList[i] };
    routeSegment.type = type === "transit" ? "walking" : "transit";

    tempRouteSegmentList[i] = routeSegment;

    setRouteSegmentList([...tempRouteSegmentList]);
  };

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
      <div className="flex mt-[8px] gap-[8px]">
        {placeList[i] && isContent(placeList[i]) && (
          <div className="relative w-[41px] h-[58px]">
            <DefaultImg src={placeList[i].thumbnail} />
          </div>
        )}
        <InputButton
          placeholder="장소를 선택해주세요."
          text={
            (placeList[i] && extractTitleOrPlace(placeList[i])) || undefined
          }
          onClick={() => clickPlaceAddInputBtnEvent(i)}
        />
      </div>
      <div className="relative mt-[12px]">
        <TimePicker
          views={["hours", "minutes"]}
          label="시간 선택"
          className="h-[40px] w-[140px]"
          sx={{
            "& .MuiInputBase-root": {
              height: "40px", // 입력 필드 높이
              alignItems: "center", // 텍스트 중앙 정렬
            },
            "& .MuiInputLabel-root": {
              transform: "translate(12px, 9px)", // 라벨 초기 위치 조정
              fontSize: "16px", // 라벨 크기
            },
            "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiFormLabel-filled":
              {
                transform: "translate(12px, -8px) scale(0.75)", // 포커스/값 있을 때 라벨 위치 및 크기
              },
            "& .MuiSvgIcon-root": {
              fontSize: "20px", // 아이콘 크기
            },
          }}
        />
      </div>
      {routeList[i] && (
        <div className="flex flex-col mt-[24px]">
          <div className="h-[40px]">
            <Button
              className="w-fit h-[30px] py-[4px] px-[8px] text-button6"
              variant="ghost"
              onClick={() =>
                typeChangeButtonClickEvent(routeList[i]?.type || "transit")
              }
            >
              {routeList[i].type === "transit"
                ? "도보 경로로 알아보기"
                : "대중교통 경로로 알아보기"}
            </Button>
          </div>
          <div className="relative flex items-center">
            <div className="absolute h-full w-[2px] bg-grey-02"></div>
            {/* 대중교통 정보 */}
            {routeList[i].type === "transit" && (
              <div className="ml-[24px] text-body3 text-grey-04">
                <div>
                  대중교통: {formatSecondToTimeString(routeList[i].totalTime)}
                </div>
                {/* 추가 정보 */}
                <div className="mt-[8px]">
                  <p>
                    총 거리:{" "}
                    {routeList[i].info?.routes[0]?.legs[0]?.distance?.text ||
                      "정보 없음"}
                  </p>
                  <p>
                    환승 횟수:{" "}
                    {(routeList[i].info?.routes[0]?.legs[0]?.steps.filter(
                      (step) => step.travel_mode === "TRANSIT"
                    ).length || 0) - 1}{" "}
                    회
                  </p>
                  <p>
                    주요 경로:
                    {routeList[i].info?.routes[0]?.legs[0]?.steps
                      .filter((step) => step.travel_mode === "TRANSIT")
                      .map(
                        (step, index) =>
                          `${step.transit?.line?.name || "알 수 없음"}`
                      )
                      .join(" -> ")}
                  </p>
                </div>
              </div>
            )}
            {/* 도보 정보 */}
            {routeList[i].type === "walking" && (
              <div className="ml-[24px] text-body3 text-grey-04">
                <div>
                  걸어서: {formatSecondToTimeString(routeList[i].totalTime)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
