const multer = require("multer");
const { allowedExtension } = require("../config/protect");
const { errorResponse } = require("../utils/index");
const path = require("path");
const fs = require("fs");

const fileFilter = (req, file, cb) => {
  const ext = file.originalname.split(".").pop();
  if (allowedExtension.includes(ext)) {
    cb(null, true);
  } else {
    return errorResponse(400, "invalidFileType");
  }
};

try {
  if (!fs.existsSync(path.join(__dirname, "../public/img"))) {
    fs.mkdir(
      path.join(__dirname, "../public/img"),
      { recursive: false },
      (err) => {
        if (err) throw err;
      }
    );
  }
} catch (err) {
  console.log(err);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/img"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadFile = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fieldNameSize: 255, fileSize: 2000000 },
});

module.exports = uploadFile;
