import Link from "next/link";
import RightArrow from "@/icons/right-arrow.svg";

interface Props {
  children: string;
  href: string;
}

/**
 * @deprecated
 */
const LinkItem = ({ children, href }: Props) => {
  return (
    <Link
      href={href}
      className="flex justify-between items-center w-[100%] h-[48px] px-[24px]"
      onClick={(e) => {
        e.preventDefault();
        // TODO: 관련해서 리팩토링 진행해야함
      }}
    >
      <div className="text-h2">{children}</div>
      <RightArrow />
    </Link>
  );
};

export default LinkItem;
