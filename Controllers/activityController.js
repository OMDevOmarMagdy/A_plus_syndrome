// controllers/activityController.js
const ActivityLog = require("../models/activityLogModel");

exports.getLastActivities = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .sort({ createdAt: -1 }) // أحدث الأول
      .limit(3)
      .populate("user", "name email"); // نعرض بيانات المستخدم

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
