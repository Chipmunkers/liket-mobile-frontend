import type { Meta } from "@storybook/react";

import Header from "./Header";
import SearchHeader from "./SearchHeader";

const meta: Meta<typeof Header> = {
  title: "components/Header",
  component: Header,
};

export default meta;

export const GeneralHeader = {
  render: () => {
    return (
      <>
        <div className="relative h-[48px]">
          <Header>
            <Header.LeftOption logo />
            <Header.MiddleText text="프로필" />
          </Header>
        </div>
        <div className="relative h-[48px]">
          <Header>
            <Header.LeftOption
              option={{
                close: true,
              }}
            />
            <Header.MiddleText text="필터" />
          </Header>
        </div>
        <div className="relative h-[48px]">
          <Header>
            <Header.LeftOption
              townName="성동구"
              onClickTownSelection={() => {}}
            />
            <Header.RightOption
              option={{
                search: true,
                like: true,
              }}
            />
          </Header>
        </div>
        <div className="relative h-[48px]">
          <Header>
            <Header.LeftOption
              option={{
                back: true,
              }}
            />
            <Header.RightOption
              option={{
                search: true,
                like: true,
              }}
            />
          </Header>
        </div>
        <div className="relative h-[48px]">
          <Header>
            <Header.LeftOption
              option={{
                back: true,
              }}
            />
            <Header.RightOption
              option={{
                check: {
                  disabled: true,
                },
              }}
            />
          </Header>
        </div>
        <div className="relative h-[48px]">
          <Header>
            <Header.LeftOption
              option={{
                back: true,
              }}
            />
            <Header.RightOption
              option={{
                check: {
                  disabled: false,
                },
              }}
            />
          </Header>
        </div>
      </>
    );
  },
};

export const SearchHeaderIndex = {
  render: () => {
    return (
      <SearchHeader onSearch={() => {}} placeholder="검색어를 입력해주세요." />
    );
  },
};
