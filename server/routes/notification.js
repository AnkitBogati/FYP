const express = require("express");
const Notification = require("../models/Notification");
const router = express.Router();

// Get all notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .populate("bookingId");
    res.status(200).json(notifications);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// Mark notification as read
router.patch("/:id/read", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.status(200).json(notification);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = router;