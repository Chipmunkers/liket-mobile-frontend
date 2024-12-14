"use client";

import { classNames } from "@/shared/helpers/classNames";
import { useGetSafeArea } from "@/shared/hooks/useGetSafeArea";

import SizeEdit from "./SizeEdit";
import TextEdit from "./TextEdit";
import StickerEdit from "./StickerEdit";
import WriteTabProps from "./types/WriteTab";

const WriteTab = ({
  selectedIndex,
  hidden,
  enabled = true,
  onChangeTab,
  onClickText,
  onClickChangeSize,
  onClickSticker,
  onClickColor,
}: WriteTabProps) => {
  const items = [
    {
      label: "사이즈",
      content: <SizeEdit onClickChangeSize={onClickChangeSize} />,
    },
    {
      label: "텍스트",
      content: <TextEdit onClickColor={onClickColor} />,
    },
    {
      label: "스티커",
      content: <StickerEdit onClickSticker={onClickSticker} />,
    },
  ];

  const { safeArea } = useGetSafeArea();

  return (
    <div
      className={classNames(
        "fixed bottom-0 w-[100%] max-w-content bg-white",
        hidden && "hidden"
      )}
      style={{
        paddingBottom: safeArea.bottom + "px",
      }}
    >
      <div>
        {items.map(({ label, content }, index) => {
          const isSelected = index === selectedIndex;

          return (
            <section
              key={index}
              id={`${label}-panel`}
              aria-hidden={!enabled || !selectedIndex}
              role="tabpanel"
              className={classNames(
                "bg-white bg-opacity-80 translate-y-[-100%] absolute left-[24px] right-[24px] border-grey-01 border-solid border-t-[1px] min-w-[342px]",
                isSelected && enabled ? "block" : "hidden"
              )}
            >
              {content}
            </section>
          );
        })}
      </div>
      <div
        role="tablist"
        aria-label="적용 가능 편집 리스트"
        className="w-[100%] h-[100%] flex pl-[24px] pr-[24px]  shadow-[0px_-8px_16px_0px_rgba(0,0,0,0.04)]"
      >
        {items.map(({ label }, index) => {
          const isSelected = index === selectedIndex;

          return (
            <button
              key={index}
              id={`${label}-tab`}
              role="tab"
              disabled={!enabled}
              aria-controls={`${label}-panel`}
              aria-selected={isSelected}
              className={classNames(
                "flex-1 border-solid h-[40px] center",
                isSelected && enabled
                  ? "text-button3 text-skyblue-01 border-t-[2px] border-skyblue-01"
                  : "text-button4 text-grey-02 border-t-[1px] border-grey-01"
              )}
              onClick={() => {
                if (label === "텍스트") {
                  onClickText();
                }

                onChangeTab(index);
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WriteTab;
