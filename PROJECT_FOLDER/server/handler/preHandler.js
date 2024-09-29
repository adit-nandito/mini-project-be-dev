const Multer = require('multer');

const storage = Multer.memoryStorage();

// File filter to check for file type (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPG and PNG are allowed.'));
  }
};

const uploadImage = Multer({ storage, fileFilter });

module.exports = {
  uploadImage
};
