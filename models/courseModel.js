// models/courseModel.js
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    instructor: {
      type: String,
    },
    price: {
      type: Number,
      min: [0, "Price cannot be negative"],
    },
    duration: {
      type: String,
    },

    // ✅ Course cover image
    image: {
      type: String, // will store S3 fileKey
      default: "default-course.jpg",
    },

    // ✅ Course videos
    videos: [
      {
        fileKey: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    category: {
      type: String,
      enum: ["Programming", "Design", "Marketing", "Business", "Other"],
      default: "Other",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // ✅ Course belongs to a Subject
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
