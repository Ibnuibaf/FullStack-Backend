import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloud = async (file) => {
  const response = await cloudinary.uploader.upload(
    file.path,
    { public_id: file.originalname, upload_preset: "image_preset" },
    function (error, _) {
      if (error) {
        return {isError:true,message:error.message}
      }
    }
  );

  return response
};

export default uploadImageToCloud