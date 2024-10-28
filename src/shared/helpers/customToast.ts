import toast from "react-hot-toast";

const defaultStyle = {
  borderRadius: "28px",
  fontSize: "14px",
  fontWeight: 400,
  background: "#000",
  color: "#fff",
};

const customToast = (message: string, duration?: number) =>
  toast(message, { style: defaultStyle, duration: duration || 2000 });

export default customToast;
