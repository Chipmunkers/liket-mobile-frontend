import Link from "next/link";

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
          <Link
            className="underline"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.kopis.or.kr/por/cs/openapi/openApiInfo.do?menuId=MNU_00074"
          >
            한국문화정보원
          </Link>{" "}
          |{" "}
          <Link
            className="underline"
            rel="noopener noreferrer"
            target="_blank"
            href="https://api.visitkorea.or.kr/"
          >
            한국관광공사
          </Link>
        </div>
      </div>
    </footer>
  );
};
