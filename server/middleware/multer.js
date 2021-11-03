const multer = require('multer');
const DatauriParser = require('datauri/parser');
const path = require('path');

// Setup multer
const storage = multer.memoryStorage();

const multerUploads = multer({
  storage,
  limits: {
    fileSize: 1000000,
  },
}).single('images');

// DataURI
const parser = new DatauriParser();

// pass the request object and format the buffer and return a string blob.
// eslint-disable-next-line max-len
const dataUri = (req) => {
  console.log('logging from dataUri: ', req.file.originalname);
  return parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);
};

module.exports = { multerUploads, dataUri };
