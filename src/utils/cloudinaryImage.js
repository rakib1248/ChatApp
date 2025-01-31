/**
 * Image upload on cloudinary
 *
 */
import axios from "axios";
export const cloudImgUpload = async ({ file, cloudName, preset }) => {
  // create form data
  const form__data = new FormData();
  form__data.append("file", file);
  form__data.append("upload_preset", preset);
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    form__data
  );
  return response.data;
};
