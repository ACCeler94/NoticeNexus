const multer = require('multer');

//const maxSize = 1048576 // file max size in bytes

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.')
    cb(null, `${name}-${Date.now()}-.${ext}`)
  }
});

const imageUpload = multer({ storage });

module.exports = imageUpload;