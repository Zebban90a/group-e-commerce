const multer = require('multer');
const DatauriParser = require('datauri/parser');
const path = require('path');

// Setup multer
const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single('image');

// DataURI
const parser = new DatauriParser();

// pass the request object and format the buffer and return a string blob.
const dataUri = (req) => parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports = { multerUploads, dataUri };
