import { classNames } from "@/shared/helpers/classNames";
import { Props } from "./types";

export const InputWrapper = ({ children, className = "" }: Props) => {
  return (
    <div className={classNames("relative flex flex-col", className)}>
      {children}
    </div>
  );
};
