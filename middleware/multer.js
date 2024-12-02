import multer from "multer";
// Multer setup (using memory storage or disk storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Name the file
  }
});

const upload = multer({ storage: storage });
