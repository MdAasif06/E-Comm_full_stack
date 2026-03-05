import cloudinary from "../config/cloudinary.js";

const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "stridex-products",
  });
};

export default uploadImage;