const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadFile = (folder) => {
  // Create storage engine
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const folderPath = path.join(__dirname, `../uploads/${folder}`);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      cb(null, folderPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  // Initialize upload middleware and add file size limit
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB file size limit
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  });

  // File type validation function
  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only! (jpeg, jpg, png, gif)');
    }
  }

  // Return the configured upload instance for use in routes
  return upload.single('myFile'); // Ensure this matches your HTML form name attribute
};

module.exports = uploadFile;
