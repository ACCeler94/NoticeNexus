const fs = require('fs');

function deleteImage(filename) {
  const filePath = './public/uploads/' + filename;
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      console.log(`File does not exist: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error deleting file: ${err}`);
  }
}

module.exports = deleteImage;