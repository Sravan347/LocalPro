const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");
const cloudinary = require("./cloudinary");

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "provider_services", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) => {
      const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9);
      return uniqueName + path.extname(file.originalname).replace(".", "");
    },
  },
});

const upload = multer({ storage });

module.exports = upload;
