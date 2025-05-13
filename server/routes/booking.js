const router = require("express").Router()

const Booking = require("../models/Booking");
const Listing = require("../models/Listing");

/* CREATE BOOKING */
// router.post("/create", async (req, res) => { 
//   try {
//     const { customerId, hostId, listingId, startDate, endDate, totalPrice,bookingStatus, customerName, customerProfileImage } = req.body
//     const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice, bookingStatus, customerName, customerProfileImage })
//     await newBooking.save()
//     res.status(200).json(newBooking)
//   } catch (err) {
//     console.log(err)
//     res.status(400).json({ message: "Fail to create a new Booking!", error: err.message })
//   }
// })


router.post("/create", async (req, res) => {
  try {
    const {
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
      bookingStatus,
      customerName,
      customerProfileImage
    } = req.body;

    // Convert to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Check for overlapping accepted bookings for the same listing
    const overlappingBooking = await Booking.findOne({
      listingId,
      bookingStatus: "accepted", // Only check against accepted bookings
      $or: [
        {
          startDate: { $lte: end },
          endDate: { $gte: start }
        }
      ]
    });

    if (overlappingBooking) {
      return res.status(409).json({
        message: "This property is already booked for the selected dates."
      });
    }

    // Create and save the booking
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
      bookingStatus,
      customerName,
      customerProfileImage
    });

    await newBooking.save();
    res.status(200).json(newBooking);
  } catch (err) {
    console.log("Create Booking Error:", err);
    res.status(400).json({
      message: "Failed to create a new booking!",
      error: err.message
    });
  }
});



// PATCH: Update reservation status by ID
// router.patch("/:reservationId/status", async (req, res) => {
//   try {
//     const { reservationId } = req.params;
//     const { status } = req.body;

//     const updatedBooking = await Booking.findByIdAndUpdate(
//       reservationId,
//       { bookingStatus:status },
//       { new: true }
//     ); 

//     if (!updatedBooking) {
//       return res.status(404).json({ message: "Booking not found!" });
//     }

//     res.status(200).json(updatedBooking);
//   } catch (err) {
//     console.error("Failed to update booking status:", err.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


router.patch("/:reservationId/status", async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      reservationId,
      { bookingStatus: status },
      { new: true }
    ).populate("listingId");

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    // Update listing isBooked field based on status
    if (updatedBooking?.listingId?._id) {
      const isBooked = status === "accepted"; // Only set true when accepted
      await Listing.findByIdAndUpdate(
        updatedBooking.listingId._id,
        { isBooked },
        { new: true }
      );
    }

    res.status(200).json(updatedBooking);
  } catch (err) {
    console.error("Failed to update booking status:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router