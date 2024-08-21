import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";
import { colors } from "@/shared/style/color";
import { Props } from "./types";

const itemShapes = (
  <path d="M11.0372 3.56326C11.431 2.81225 12.569 2.81225 12.9628 3.56326L15.2212 7.86978C15.3776 8.16801 15.6799 8.37471 16.0296 8.42254L21.0795 9.11312C21.9602 9.23355 22.3118 10.2521 21.6746 10.8366L18.0204 14.1888C17.7674 14.4209 17.6519 14.7554 17.7116 15.0832L18.5743 19.8165C18.7247 20.6419 17.8041 21.2714 17.0164 20.8817L12.4996 18.6469C12.1868 18.4922 11.8132 18.4922 11.5004 18.6469L6.98358 20.8817C6.1959 21.2714 5.27529 20.6419 5.42573 19.8165L6.28836 15.0832C6.34809 14.7554 6.23262 14.4209 5.97957 14.1888L2.32541 10.8366C1.68816 10.2521 2.03981 9.23355 2.92046 9.11312L7.97038 8.42254C8.32009 8.37471 8.6224 8.16801 8.7788 7.86978L11.0372 3.56326Z" />
);

const StarRating = ({
  readOnly,
  value,
  inactiveFillColor = colors.grey["01"],
  onChangeRate,
}: Props) => {
  return (
    <Rating
      style={{
        maxWidth: 227,
      }}
      halfFillMode="svg"
      orientation="horizontal"
      value={value}
      readOnly={readOnly}
      itemStyles={{
        itemShapes,
        activeFillColor: colors.skyblue["01"],
        inactiveFillColor,
      }}
      onChange={onChangeRate}
    />
  );
};

export default StarRating;
