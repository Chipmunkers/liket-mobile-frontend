import { GenreType } from "@/types/const";
import Image from "next/image";
import Link from "next/link";

interface GenreTileProps {
  genre: GenreType | "전체";
}

/**
 * @deprecated
 */
const GenreTile = ({ genre }: GenreTileProps) => {
  return (
    <Link
      href={`/category?type=${genre}`}
      className="flex flex-col gap-[4px] items-center w-[56px] h-[78px] mr-[8px]"
    >
      <div className="w-[56px] h-[56px]">
        <Image
          unoptimized
          src={`/icons/${genre}.svg`}
          alt={`${genre} 아이콘 타일`}
          width={56}
          height={56}
        />
      </div>
      {genre !== "전체" && <div className="text-body5">{genre}</div>}
    </Link>
  );
};

export default GenreTile;
