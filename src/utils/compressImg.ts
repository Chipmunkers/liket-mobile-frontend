import imageCompression, { Options } from "browser-image-compression";

export const compressImage = async (file: File, option: Options) => {
  try {
    const compressedFile = await imageCompression(file, option);

    return compressedFile;
  } catch (error) {
    throw error;
  }
};
