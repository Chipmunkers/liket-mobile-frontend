import { useState, MouseEvent } from "react";
import CustomBottomSheet from "../BottomSheet";
import SmallDownArrow from "@/icons/down-arrow-small.svg";

const ORDER_TYPE = ["최신순", "인기순"] as const;

type OrderType = (typeof ORDER_TYPE)[number];

interface Props {
  onChangeType: (orderType: OrderType) => void;
}

/**
 * @deprecated
 */
const Index = ({ onChangeType }: Props) => {
  const [orderType, setOrderType] = useState<OrderType>(ORDER_TYPE[0]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const onClickButton = () => setIsBottomSheetOpen(true);

  return (
    <>
      <button
        className="flex items-center text-button3"
        onClick={onClickButton}
      >
        {orderType}
        <SmallDownArrow />
      </button>
      <CustomBottomSheet open={isBottomSheetOpen} title="정렬">
        <ul
          onClick={(e: MouseEvent<HTMLUListElement>) => {
            const target = e.target as HTMLUListElement;

            const textContent = target.textContent;

            if (target.tagName !== "BUTTON" || !textContent) {
              return;
            }

            setOrderType(textContent as OrderType);
          }}
        >
          {ORDER_TYPE.map((type) => {
            return (
              <li key={type}>
                <button>{type}</button>
              </li>
            );
          })}
        </ul>
      </CustomBottomSheet>
    </>
  );
};

export default Index;
