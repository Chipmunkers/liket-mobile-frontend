import { memo, useRef, MouseEvent } from "react";
import Image from "next/image";
import { classNames } from "@/shared/helpers/classNames";

interface Props {
  lat: number;
  lng: number;
  icon: string;
  isSelected?: boolean;
  numberOfMarkers?: number;
  onClickMarker: (e: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * lat과 lng는 지우면 안됨. CustomMarker 내부에서 안쓰더라도 라이브러리가 인식하고 동작함.
 * @param param
 * @returns
 */
const CustomMarker = ({
  lat,
  lng,
  icon,
  isSelected,
  numberOfMarkers = 1,
  onClickMarker,
}: Props) => {
  const wrapperRef = useRef(null);

  return (
    <button
      className={classNames(
        "absolute translate-x-[-50%] translate-y-[-100%] cursor-pointer bg-transparent border-0",
        isSelected ? "h-[50px] w-[40px]" : "size-[30px]"
      )}
      onClick={onClickMarker}
      ref={wrapperRef}
    >
      <Image src={icon} alt="마커" layout="fill" objectFit="contain" />
      {numberOfMarkers > 1 && (
        <div
          className={classNames(
            "overflow-hidden absolute w-4 h-4 flex items-center justify-center border-0 rounded-full",
            isSelected
              ? "left-[22px] top-[26.8px]"
              : "left-[14.5px] top-[14.9px]"
          )}
        >
          <div
            className={classNames(
              "text-white font-bold",
              isSelected ? "text-[13px]" : "text-[10.8px]"
            )}
          >
            {numberOfMarkers}
          </div>
        </div>
      )}
    </button>
  );
};

export default memo(CustomMarker);
