import Image from "next/image";
import { IconType } from "./types/Icon";
import { IconButtonGroupProps } from "./types/IconButtonGroup";

const IconButtonGroup = ({
  icons,
  iconGap,
  iconSize,
  onClickIcon,
}: IconButtonGroupProps) => {
  return (
    <ul
      style={{
        gap: iconGap,
      }}
      className={`flex justify-between overflow-x-auto x-[100%] h-[100%]`}
    >
      {icons.map((icon: IconType) => {
        let iconName: IconType | null = null;
        let status = {
          isDisabled: false,
          isActive: false,
        };

        if (typeof icon === "string") {
          iconName = icon;
        } else {
          const { name, isDisabled, isActive } = icon;
          status.isActive = !!isActive;
          status.isDisabled = !!isDisabled;
          iconName = name;
        }

        return (
          <li key={iconName} className={`flex justify-center items-center`}>
            <button
              disabled={status.isDisabled}
              onClick={() => onClickIcon(iconName as IconType)}
              style={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
              }}
            >
              <Image
                alt={`${iconName} 아이콘`}
                width={iconSize}
                height={iconSize}
                src={`/stickers/${iconName}.svg`}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default IconButtonGroup;
