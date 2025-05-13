// Yo suruko ho chalxa
// const mongoose = require("mongoose");

// const BookingSchema = new mongoose.Schema(
//   {
//     customerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     hostId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     listingId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Listing",
//     },
//     startDate: {
//       type: String,
//       required: true,
//     },
//     endDate: {
//       type: String,
//       required: true,
//     },
//     totalPrice: {
//       type: Number,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Booking = mongoose.model("Booking", BookingSchema)
// module.exports = Booking

// yo chai tyo card component matra dekhaune wala dubaima user ko trip list ma ra host ko reservation ma pani
// const mongoose = require("mongoose");
// const BookingSchema = new mongoose.Schema(
//   {
//     customerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     hostId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     listingId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Listing",
//     },
//     startDate: String,
//     endDate: String,
//     totalPrice: Number,
//     customerName: String
//   },
//   { timestamps: true }
// );

// const Booking = mongoose.model("Booking", BookingSchema);
// module.exports = Booking;


// Yo chai notification halera ho


const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
    startDate: String,
    endDate: String,
    totalPrice: Number,
    bookingStatus: {
      type: String,
      enum: ["pending", "accepted", "cancelled", "completed"],
      default: "pending"
    },
    customerName: String,
    customerProfileImage: String, // New field
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
