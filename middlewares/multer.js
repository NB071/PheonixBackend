const multer = require("multer");
const path = require("node:path");
const fs = require("node:fs");
const query = require("../models/queries");

const allowedFileTypes = [
  "image/svg+xml",
  "image/png",
  "image/jpeg",
  "image/gif",
];

// multer storage for Background upload
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, "../public/images/backgrounds"));
  },
  filename: async (req, file, cb) => {
    try {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = `${req.decoded.userId}-${uniqueSuffix}${path.extname(
        file.originalname
      )}`;

      fs.readdir(
        path.join(__dirname, "../public/images/backgrounds"),
        (err, files) => {
          if (err) console.log(err);
          else {
            return files.forEach((file) => {
              if (file.startsWith(req.decoded.userId)) {
                 fs.unlink(
                  path.join(__dirname, "../public/images/backgrounds", file),
                  (err) => console.log(err)
                );
              }
            });
          }
        }
      );
      cb(null, fileName);
    } catch (err) {
      cb(err);
    }
  },
});

// multer middleware for Background upload
const backgroundMulter = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
  fileFilter: (_req, file, cb) => {
    // Only allowed imges on array above
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Allowed types: SVG, PNG, JPEG, GIF"));
    }
  },
});

module.exports = {
  backgroundMulter,
};
