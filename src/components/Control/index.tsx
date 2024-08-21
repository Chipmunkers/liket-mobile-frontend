import { EmptyFunction } from "@/types/common";
import { classNames } from "@/utils/helpers";

interface ControlProps {
  isSelected: boolean;
  onClick: EmptyFunction;
}

/**
 * @deprecated
 */
const Control = ({ isSelected, onClick }: ControlProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "w-[8px] h-[8px] rounded-[50%]",
        isSelected ? "bg-skyblue-01" : "bg-grey-01"
      )}
    />
  );
};

export default Control;
