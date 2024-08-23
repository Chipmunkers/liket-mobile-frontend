import { classNames } from "@/shared/helpers/classNames";
import { Props } from "./types";

const PageController = ({ isSelected, onClick }: Props) => {
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

export default PageController;
