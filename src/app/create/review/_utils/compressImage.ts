import imageCompression, { Options } from "browser-image-compression";

export const compressImage = async (
  file: File,
  options: Options = {
    maxSizeMB: 1,
    fileType: "image/jpeg",
  }
) => {
  try {
    const compressedFile = await imageCompression(file, options);

    return compressedFile;
  } catch (error) {
    throw error;
  }
};
