import axios from "axios";

const uploadToCloudinary = async (imageUrl) => {
  try {
    const formData = new FormData();
    formData.append("file", imageUrl);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    return response.data.secure_url; // Cloudinary-hosted image URL
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export default uploadToCloudinary;