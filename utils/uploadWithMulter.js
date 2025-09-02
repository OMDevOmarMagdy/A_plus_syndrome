const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./s3");

// Debug log to check if Railway is passing the env variable
// console.log("🚀 ENV Bucket Name:", process.env.AWS_BUCKET_NAME);

if (!process.env.AWS_BUCKET_NAME) {
  throw new Error("❌ AWS_BUCKET_NAME is missing in environment variables");
}

// Multer for upload
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

module.exports = upload;
