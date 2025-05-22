//Ankit Bogati
const router = require("express").Router()

const Booking = require("../models/Booking")
const User = require("../models/User")
const Listing = require("../models/Listing")
const bcrypt = require('bcrypt');
const multer = require("multer");

// Configuration multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

// File filter for Multer
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Not an image! Please upload an image."), false);
    }
};

const upload = multer({ storage, fileFilter });

// Host routes from here.
// 1. Become a Host
// BECOME A HOST
router.patch("/:id/become-host", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "host") {
      return res.status(400).json({ message: "User is already a host" });
    }

    user.role = "host";
    await user.save();

    res.status(200).json({ message: "User promoted to host", updatedUser: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to become host", error: err.message });
  }
});

/* GET TRIP LIST */
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params
    const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId")
    res.status(202).json(trips)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: "Can not find trips!", error: err.message })
  }
})

/* ADD LISTING TO WISHLIST */
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params
    const user = await User.findById(userId)
    const listing = await Listing.findById(listingId).populate("creator")

    const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId)

    if (favoriteListing) {
      user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId)
      await user.save()
      res.status(200).json({ message: "Listing is removed from wish list", wishList: user.wishList})
    } else {
      user.wishList.push(listing)
      await user.save()
      res.status(200).json({ message: "Listing is added to wish list", wishList: user.wishList})
    }
  } catch (err) {
    console.log(err)
    res.status(404).json({ error: err.message })
  }
})

/* GET PROPERTY LIST */
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params
    const properties = await Listing.find({ creator: userId }).populate("creator")
    res.status(202).json(properties)
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: "Can not find properties!", error: err.message })
  }
})

// /* GET RESERVATION LIST */
// router.get("/:userId/reservations", async (req, res) => {
//   try {
//     const { userId } = req.params
//     const reservations = await Booking.find({ hostId: userId }).populate("customerId hostId listingId")
//     res.status(202).json(reservations)
//   } catch (err) {
//     console.log(err)
//     res.status(404).json({ message: "Can not find reservations!", error: err.message })
//   }
// })


/* GET RESERVATION LIST */
router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const reservations = await Booking.find({ hostId: userId })
      .populate("listingId")
      .populate("hostId", "firstName lastName email") // optional, if needed
      .populate("customerId", "firstName lastName profileImagePath email"); // ✅ only needed guest info

    res.status(202).json(reservations);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: "Can not find reservations!",
      error: err.message,
    });
  }
});



// Admin routes begins from here
// 1. Fetch all users except admin
router.get("/", async (req, res) => {
  try {
      const users = await User.find({ role: { $ne: "admin" } });
      res.json(users);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// 2. Create a new user by admin
router.post("/", upload.single('profileImage'), async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Handle the uploaded file
  const profileImagePath = req.file ? req.file.path : null; // Get the path of the uploaded file

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Save the hashed password
      role,
      profileImagePath
  });

  try {
      const newUser = await user.save();
      res.status(201).json(newUser);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

// 3. Update a user
router.put("/:id", async (req, res) => {
  const { password,email, ...updateData } = req.body;

  // Hash the password if provided
  if (password) {
      updateData.password = await bcrypt.hash(password, 10);
  }

  try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

// 4. Delete a user
router.delete("/:id", async (req, res) => {
  try {
      await User.findByIdAndDelete(req.params.id);
      res.status(204).end();
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});






module.exports = router


