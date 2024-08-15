"use client";

import { classNames } from "../../utils/helpers";

const DefaultLoading = (props: {
  color?: "white" | "skyblue-01" | "grey-01";
  dotSize?: string;
  center?: boolean;
}) => {
  const { dotSize, color, center } = props;

  return (
    <div>
      <ul
        className={classNames(
          "flex gap-[8px]",
          center
            ? "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%]"
            : ""
        )}
      >
        <li
          className={classNames(
            dotSize ? `w-[${dotSize}] h-[${dotSize}]` : `w-[12px] h-[12px]`,
            "rounded-full animate-bounce1",
            `bg-${color || "skyblue-01"}`
          )}
        ></li>
        <li
          className={classNames(
            dotSize ? `w-[${dotSize}] h-[${dotSize}]` : `w-[12px] h-[12px]`,
            "rounded-full animate-bounce2",
            `bg-${color || "skyblue-01"}`
          )}
        ></li>
        <li
          className={classNames(
            dotSize ? `w-[${dotSize}] h-[${dotSize}]` : `w-[12px] h-[12px]`,
            "rounded-full animate-bounce3",
            `bg-${color || "skyblue-01"}`
          )}
        ></li>
      </ul>
    </div>
  );
};

export default DefaultLoading;
