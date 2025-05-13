const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking"
    },
    message: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      enum: ["booking_request", "booking_accepted", "booking_rejected"],
      required: true
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification; 