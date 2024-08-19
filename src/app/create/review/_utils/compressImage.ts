import imageCompression from "browser-image-compression";

export const compressImage = async (file: File) => {
  const options = {
    maxSizeMB: 1,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);

    return compressedFile;
  } catch (error) {
    throw error;
  }
};
