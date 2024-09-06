import CustomError from "@/shared/ui/CustomError";

const DevIngError = () => {
  return (
    <CustomError
      title="개발중입니다."
      text1="현재 페이지는 준비중입니다."
      text2="빠른 시일내에 업데이트 하도록 하겠습니다."
    />
  );
};

export default DevIngError;
