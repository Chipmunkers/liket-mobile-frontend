import CustomError from "@/shared/ui/CustomError";

const WrongAccessError = () => {
  return (
    <CustomError
      title="잘못된 접근입니다."
      text1="잘못된 경로로 접근하였습니다."
      text2="올바른 주소로 서비스를 이용해주세요."
    />
  );
};

export default WrongAccessError;
