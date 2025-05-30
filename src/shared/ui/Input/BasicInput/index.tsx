import { classNames } from "@/shared/helpers/classNames";
import { FieldValues } from "react-hook-form";
import { Props } from "./types";
import Button from "@/shared/ui/Button";

const BasicInput = <T extends FieldValues>({
  field,
  formState,
  required,
  onChange,
  register,
  className = "",
  buttonText,
  buttonOnClick,
  buttonClassName = "",
  buttonDisabled = false,
  ...props
}: Props<T>) => {
  const errors = formState?.errors;
  const isErrorExist = errors?.[field]?.message ? true : false;

  return (
    <div className={classNames("relative", className)}>
      <input
        aria-invalid={!!isErrorExist}
        aria-required={!!required}
        required={required}
        className={classNames(
          "w-[100%] box-border pl-[8px] pr-[8px] pt-[16px] text-body3 border-b-[1px] border-b-grey-01 focus:border-b-[2px] focus:pb-[14px] placeholder:text-button4 placeholder:text-grey-02",
          isErrorExist
            ? "border-b-[2px] border-b-rosepink-01 focus:border-b-rosepink-01 pb-[14px]"
            : "focus:border-b-skyblue-01 pb-[15px]"
        )}
        id={field}
        {...(register && field ? register(field, { onChange }) : {})}
        {...props}
      />
      {errors?.[field]?.message?.toString() && (
        <strong
          className="text-button6 text-rosepink-01 h-[18px] bottom-0 absolute left-0 pt-[4px]"
          style={{
            transform: "translateY(100%)",
          }}
          aria-live="assertive"
        >
          {errors[field]?.message?.toString()}
        </strong>
      )}
      {buttonText && (
        <Button
          variant={buttonDisabled ? "secondary" : "ghost"}
          className={classNames(
            "text-button4 absolute right-0 top-[50%] translate-y-[-50%] px-[8px] ",
            buttonClassName
          )}
          disabled={buttonDisabled}
          style={{ paddingTop: "2px", paddingBottom: "0px" }}
          onClick={buttonOnClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default BasicInput;
