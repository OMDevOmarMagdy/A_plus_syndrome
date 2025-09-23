const mongoose = require("mongoose");
const moduleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Module must have a name"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Module must have a price"],
    },
    cover: {
      type: String,
      trim: true,
    },
    year_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Year",
      required: true,
    },
  },
  { timestamps: true }
);

moduleSchema.virtual("subjects", {
  ref: "Subject",
  localField: "_id",
  foreignField: "module_id",
});

moduleSchema.set("toJSON", { virtuals: true });
moduleSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Module", moduleSchema);
