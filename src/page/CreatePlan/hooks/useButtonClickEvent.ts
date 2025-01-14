import { ModalType } from "@/page/CreatePlan/_ui/PlaceSearch/type";
import { Place } from "@/page/CreatePlan/type";
import customToast from "@/shared/helpers/customToast";
import { stackRouterBack } from "@/shared/helpers/stackRouter";
import { SetState } from "@/shared/types/react";
import { usePathname, useRouter } from "next/navigation";

export const useButtonClickEvent = ({
  setSearchModalType,
  placeList,
  setPlaceList,
  setSelectedIndex,
}: {
  setSearchModalType: SetState<ModalType>;
  placeList: (Place | null)[];
  setPlaceList: SetState<(Place | null)[]>;
  setSelectedIndex: SetState<number>;
}) => {
  const router = useRouter();
  const pathName = usePathname();

  const clickHeaderBackBtnEvent = () => {
    const result = confirm(
      "작성된 내용은 저장되지 않습니다. 정말 뒤로가시겠습니까?"
    );

    if (result === true) stackRouterBack(router);
  };

  const clickPlaceAddInputBtnEvent = (i: number) => {
    setSelectedIndex(i);
    router.push(pathName + "?modal=search");
  };

  const clickAddStopoverBtnEvent = () => {
    if (placeList.length >= 5) {
      return customToast("경유지는 최대 3개까지 설정할 수 있습니다.");
    }
    setPlaceList((data) => [...data, null]);
  };

  const clickDeleteStopoverBtnEvent = (index: number) => {
    setPlaceList(placeList.filter((place, i) => i !== index));
  };

  return {
    clickHeaderBackBtnEvent,
    clickAddStopoverBtnEvent,
    clickDeleteStopoverBtnEvent,
    clickPlaceAddInputBtnEvent,
  };
};
