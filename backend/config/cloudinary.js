const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'urbanfarmers',
    api_key: '247497956349813',
    api_secret: 'Nwgr7UqTL_aplRJgFaz8HlxtRZ0',
  });
  
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'UrbanFarmers', 
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    },
  });
  
  module.exports = {
    cloudinary,
    storage,
  };
  