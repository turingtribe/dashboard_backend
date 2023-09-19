const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  dest: "./uploads",
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

router.post("/upload_images", upload.single("image"), async (req, res) => {
  const imageFile = req.file;

  const imagePath = `./images/${imageFile.filename}`;

  await fs.promises.writeFile(imagePath, imageFile.buffer);

  res.send("Image uploaded successfully!");
});

module.exports = router;
