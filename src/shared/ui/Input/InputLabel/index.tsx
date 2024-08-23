import { classNames } from "@/shared/helpers/classNames";
import { Props } from "./types";

const InputLabel = ({
  currentLength,
  maxLength,
  htmlFor,
  children,
  required = false,
  className = "",
}: Props) => {
  const labelTextClassName = "text-caption text-grey-04";

  if (maxLength && typeof currentLength === "number") {
    return (
      <div
        className={classNames(`flex flex-row `, labelTextClassName, className)}
      >
        <label className="flex-1">{children}</label>
        <div className="text-numbering3 text-grey-04">
          {currentLength} / {maxLength}
        </div>
      </div>
    );
  }

  return (
    <label
      className={classNames(labelTextClassName, className)}
      htmlFor={htmlFor}
    >
      {children}
      {required && <span className="text-top">*</span>}
    </label>
  );
};

export default InputLabel;
