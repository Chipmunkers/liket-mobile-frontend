import { DefaultLink } from "@/shared/ui/DefaultLink";

export const ContentFooter = () => {
  return (
    <footer className="text-sm text-left p-[24px] text-body5 text-grey-04">
      <div>
        * 본 사이트는 한국문화정보원 KOPIS API와 한국관광공사 TourAPI의
        공공데이터를 활용하고 있습니다.
      </div>
      <div>
        <div>
          제공:{" "}
          <DefaultLink
            href="https://www.kopis.or.kr/por/cs/openapi/openApiInfo.do?menuId=MNU_00074"
            className="underline"
          >
            한국문화정보원
          </DefaultLink>{" "}
          |{" "}
          <DefaultLink
            href="https://api.visitkorea.or.kr/"
            className="underline"
          >
            한국관광공사
          </DefaultLink>
        </div>
      </div>
    </footer>
  );
};
