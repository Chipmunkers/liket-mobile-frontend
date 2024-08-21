import EmptyImageIcon from "@/icons/empty-img.svg";

/**
 * @deprecated
 */
const EmptyImage = (
  props: { width: string; height: string } = { width: "100%", height: "100%" }
) => {
  return (
    <div
      className="flex items-center justify-center bg-grey-03"
      style={{
        width: props.width,
        height: props.height,
      }}
    >
      <EmptyImageIcon />
    </div>
  );
};

export default EmptyImage;
