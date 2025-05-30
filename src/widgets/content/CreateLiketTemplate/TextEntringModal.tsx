import { useState, ChangeEvent, KeyboardEvent, useLayoutEffect } from "react";
import { Header, HeaderLeft, HeaderRight } from "@/shared/ui/Header";
import ReactTextareaAutosize from "react-textarea-autosize";

type TextEnteringModalProps = {
  text: string;
  isOpen: boolean;
  maxLength: number;
  allowNewLine: boolean;
  onClickClose: () => void;
  onClickCheck: (text: string) => void;
};

const TextEnteringModal = ({
  text,
  isOpen,
  maxLength,
  allowNewLine,
  onClickClose,
  onClickCheck,
}: TextEnteringModalProps) => {
  const [value, setValue] = useState(text);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (allowNewLine) {
      setValue(e.target.value);
    } else {
      setValue(e.target.value.replace(/(\r\n|\n|\r)/gm, ""));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && value.split("\n").length >= 3) {
      e.preventDefault();
    }
  };

  useLayoutEffect(() => {
    if (isOpen) {
      setValue(text);
    }
  }, [isOpen, text]);

  return (
    <>
      {isOpen && (
        <div className="z-[9999] flex flex-col fixed top-0 left-0 right-0 height-0 bottom-0 bg-black bg-opacity-80">
          <Header transparent>
            <HeaderLeft
              option={{
                close: {
                  color: "#fff",
                  onClick: onClickClose,
                },
              }}
            />
            <HeaderRight
              option={{
                check: {
                  onClick: () => {
                    if (value.length === 0) {
                      return;
                    }

                    onClickCheck(value);
                  },
                  disabled: !value.length,
                },
              }}
            />
          </Header>
          <div className="flex grow items-center w-full max-w-content mx-auto px-[45px] mt-[-48px]">
            <ReactTextareaAutosize
              value={value}
              onChange={handleChange}
              maxLength={maxLength}
              maxRows={3}
              onKeyDown={handleKeyDown}
              placeholder="텍스트를 입력해주세요"
              className="text-button4 text-center resize-none border-b-2 rounded-none border-skyblue-01 outline-none bg-transparent px-[8px] py-[16px] text-white w-[100%]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TextEnteringModal;
