import { memo, useRef, MouseEvent } from "react";
import Image from "next/image";

interface Props {
  lat: number;
  lng: number;
  icon: string;
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
  numberOfMarkers = 1,
  onClickMarker,
}: Props) => {
  const wrapperRef = useRef(null);

  return (
    <button
      className="absolute w-10 h-10 translate-x-[-50%] translate-y-[-100%] cursor-pointer bg-transparent border-0"
      onClick={onClickMarker}
      ref={wrapperRef}
    >
      <Image src={icon} alt="마커" layout="fill" objectFit="contain" />
      <div className="overflow-hidden absolute w-4 h-4 flex items-center justify-center border-0 rounded-full left-[22px] top-[22px]">
        {numberOfMarkers > 1 && (
          <div className="text-white text-[12px] font-bold">
            {numberOfMarkers}
          </div>
        )}
      </div>
    </button>
  );
};

export default memo(CustomMarker);
