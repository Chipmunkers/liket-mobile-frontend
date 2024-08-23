import { classNames } from "@/shared/helpers/classNames";
import { Props } from "./types";

const DefaultLoading = ({
  dotSize = "12px",
  color = "skyblue-01",
  center = true,
  className = "",
}: Props) => {
  return (
    <div>
      <ul
        className={classNames(
          className,
          "flex gap-[8px]",
          center
            ? "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%]"
            : ""
        )}
      >
        <li
          className={classNames(
            `w-[${dotSize}] h-[${dotSize}]`,
            "rounded-full animate-bounce1",
            `bg-${color}`
          )}
        ></li>
        <li
          className={classNames(
            `w-[${dotSize}] h-[${dotSize}]`,
            "rounded-full animate-bounce2",
            `bg-${color}`
          )}
        ></li>
        <li
          className={classNames(
            `w-[${dotSize}] h-[${dotSize}]`,
            "rounded-full animate-bounce3",
            `bg-${color}`
          )}
        ></li>
      </ul>
    </div>
  );
};

export default DefaultLoading;
