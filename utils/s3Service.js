const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

exports.deleteFileFromS3 = async (fileKey) => {
  try {
    await s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
      })
      .promise();
    console.log(`✅ Deleted from S3: ${fileKey}`);
  } catch (err) {
    console.error(`❌ Error deleting ${fileKey}:`, err.message);
  }
};
