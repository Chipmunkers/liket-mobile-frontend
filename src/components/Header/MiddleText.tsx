interface MiddleTextProps {
  text: string;
}
/**
 * @deprecated
 */
const MiddleText = ({ text }: MiddleTextProps) => {
  return (
    <h1
      className={`absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]`}
    >
      {text}
    </h1>
  );
};

export default MiddleText;
