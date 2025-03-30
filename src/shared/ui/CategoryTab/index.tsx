import { useRef, useState } from "react";
import { Props } from "./types";
import { classNames } from "@/shared/helpers/classNames";

const CategoryTab = ({
  list,
  selectedTab,
  wrapperStyle,
  onClickTab,
  customTabNames,
}: Props) => {
  const listRef = useRef<(HTMLLIElement | null)[]>([]);
  const [leftOffset, setLeftOffset] = useState(0);
  const [width, setWidth] = useState(0);

  return (
    <ul
      style={wrapperStyle}
      className={classNames(
        "relative flex w-[100%] px-[24px] border-b-[1px] border-grey-01 h-[40px]"
      )}
    >
      <span
        className={classNames(
          "h-full absolute border-b-[2px] border-skyblue-01 transition-all duration-300"
        )}
        style={{
          left: leftOffset,
          width: width,
        }}
      />
      {list.map((tab, index) => (
        <li
          ref={(ref) => {
            listRef.current[index] = ref;

            if (tab === selectedTab) {
              setLeftOffset(listRef.current[index]?.offsetLeft ?? 0);
              setWidth(listRef.current[index]?.clientWidth ?? 0);
            }
          }}
          key={tab}
          className={classNames(
            "grow h-[100%]",
            selectedTab === tab
              ? "text-skyblue-01 text-button3"
              : "text-button4 text-grey-03 pb-[2px]",
            "text-button3"
          )}
        >
          <button
            className="size-full center"
            onClick={() => {
              onClickTab(tab);

              if (tab === selectedTab) {
                setLeftOffset(listRef.current[index]?.offsetLeft ?? 0);
                setWidth(listRef.current[index]?.clientWidth ?? 0);
              }
            }}
          >
            {customTabNames?.[index] || tab}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryTab;
