import CustomError from "@/shared/ui/CustomError";

const NotFoundError = () => {
  return (
    <CustomError
      title="페이지를 찾을 수 없습니다."
      text1="주소가 잘못 입력되거나"
      text2="변경 혹은 삭제되어 페이지를 찾을 수 없습니다."
    />
  );
};

export default NotFoundError;
