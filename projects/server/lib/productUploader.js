const multer = require("multer");

const uploadProduct = ({
  filename = Date.now(),
  filePrefix = "FILE",
  acceptedFileTypes = [],
}) => {
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public`);
    },
    filename: (req, file, cb) => {
      cb(null, `${filePrefix}-${filename}.${file.mimetype.split("/")[1]}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    if (acceptedFileTypes.includes(extension)) {
      cb(null, true);
    } else {
      cb(new Error("invalid file type"));
    }
  };

  return multer({
    storage: diskStorage,
    fileFilter,
  });
};

module.exports = {
  uploadProduct,
};