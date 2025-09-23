const mongoose = require("mongoose");
const { Schema } = mongoose;

const yearSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Year must have a name"],
      trim: true,
    },
  },
  { timestamps: true }
);

yearSchema.virtual("modules", {
  ref: "Module",
  localField: "_id",
  foreignField: "year_id",
});

yearSchema.set("toJSON", { virtuals: true });
yearSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Year", yearSchema);
