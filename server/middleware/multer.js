const multer = require('multer');
const DataUri = require('datauri');
const path = require('path');

// Setup multer
const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single('image');

// DataURI
const dUri = new DataUri();

// pass the request object and format the buffer and return a string blob.
const dataUri = (req) => {
  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
};

module.exports = { multerUploads, dataUri };
