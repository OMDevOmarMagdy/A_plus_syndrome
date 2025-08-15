// models/activityLogModel.js
const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["ADD", "UPDATE", "DELETE", "PROMO_CODE"],
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } // دا بيضيف createdAt و updatedAt تلقائيًا
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);
