const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subject must have a name"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    cover: {
      type: String,
      trim: true,
    },
    module_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
  },
  { timestamps: true }
);

subjectSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "subject_id",
});

subjectSchema.set("toJSON", { virtuals: true });
subjectSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Subject", subjectSchema);
