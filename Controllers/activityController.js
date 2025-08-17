const ActivityLog = require("../models/activityLogModel");

exports.getLastLogs = async (req, res) => {
  try {
    const lastLogs = await ActivityLog.aggregate([
      // Sort newest first
      { $sort: { createdAt: -1 } },
      // Group by type (book, course, promoCode)
      {
        $group: {
          _id: "$type",
          lastAction: { $first: "$action" },
          description: { $first: "$description" },
          user: { $first: "$user" },
          createdAt: { $first: "$createdAt" },
        },
      },
      // Reshape response
      {
        $project: {
          _id: 0,
          type: "$_id",
          action: "$lastAction",
          description: 1,
          user: 1,
          createdAt: 1,
        },
      },
    ]);
    console.log("Last Logs before populate: ", lastLogs);

    // Populate user (name, email)
    const populatedLogs = await ActivityLog.populate(lastLogs, {
      path: "user",
      select: "name email",
    });

    res.status(200).json({
      message: "Success",
      data: populatedLogs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
