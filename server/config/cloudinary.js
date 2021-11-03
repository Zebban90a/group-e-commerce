const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadToCloudinary = (path, folder) => cloudinary.uploader.upload(path, {
  folder,
})
  .then((data) => ({
    url: data.url,
    public_id: data.public_id,
  }))
  .catch((error) => {
    console.error('Cloudinary error: ', error);
  });

module.exports = uploadToCloudinary;
