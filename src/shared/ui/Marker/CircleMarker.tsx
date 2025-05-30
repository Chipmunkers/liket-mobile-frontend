import { memo, MouseEvent } from "react";

interface Props {
  lat: number;
  lng: number;
  onClickMarker: (e: MouseEvent<HTMLButtonElement>) => void;
  children: number;
}

/**
 * lat과 lng는 지우면 안됨. CircleMarker 내부에서 안쓰더라도 라이브러리가 인식하고 동작함.
 * @param param
 * @returns
 */
const CircleMarker = ({ lat, lng, children, onClickMarker }: Props) => {
  return (
    <button
      className={`rounded-full w-[48px] h-[48px] border-[1px] bg-skyblue-01 flex justify-center items-center text-body4 text-white border-skyblue-02 bg-opacity-[80%] absolute translate-x-[-50%] translate-y-[-50%]`}
      onClick={(e) => {
        onClickMarker(e);
      }}
    >
      {children > 0 && <span className="text-xs">{children}</span>}
    </button>
  );
};

export default memo(CircleMarker);
