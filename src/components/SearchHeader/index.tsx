"use client";

import BackIcon from "@/icons/back.svg";
import SearchIcon from "@/icons/search.svg";
import RemoveIcon from "@/icons/remove.svg";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonBase } from "@mui/material";

interface SearchHeaderProps {
  placeholder: string;
  onSearch: (text: string) => void;
  replacePath?: string;
}

const SearchHeader = ({
  placeholder,
  onSearch,
  replacePath,
}: SearchHeaderProps) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleClickBackButton = () => {
    if (replacePath) {
      router.push(replacePath);
      return;
    }

    router.back();
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClickRemoveButton = () => {
    setSearchText("");
    onSearch(searchText);
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSearch(searchText);
  };

  return (
    <div className="header">
      <ButtonBase
        className="w-[48px] h-[48px] rounded-full"
        onClick={handleClickBackButton}
      >
        <BackIcon />
      </ButtonBase>
      <div className="flex-1 border-solid border-b-[1px] ml-[4px] pb-[12px] mr-[12px] pt-[16px]">
        <form className="flex" role="search" onSubmit={handleSubmitForm}>
          <input
            type="search"
            value={searchText}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder={placeholder}
            className="w-[100%] text-body3 placeholder:text-body3 placeholder-grey-02"
            onChange={handleChangeInput}
          />
          {!searchText ? (
            <button type="submit">
              <SearchIcon />
            </button>
          ) : (
            <button type="button" onClick={() => handleClickRemoveButton()}>
              <RemoveIcon />
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchHeader;
