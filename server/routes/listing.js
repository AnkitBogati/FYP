// Yo chai suruko ho second wala admin chalxa host xaina last ko host milya xaina

// const router = require("express").Router();
// const multer = require("multer");

// const Listing = require("../models/Listing");
// const User = require("../models/User");

// /* Configuration Multer for File Upload */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original file name
//   },
// });

// const upload = multer({ storage });

// /* Middleware to log incoming requests */
// router.use((req, res, next) => {
//   console.log(`Request received: ${req.method} ${req.path}`);
//   next();
// });



// /* CREATE LISTING version 2.0*/
// router.post("/create", upload.array("listingPhotos"), async (req, res) => {
//     try {
//         const {
//             creator,
//             category,
//             type,
//             streetAddress,
//             aptSuite,
//             city,
//             province,
//             country,
//             guestCount,
//             bedroomCount,
//             bedCount,
//             bathroomCount,
//             amenities,
//             title,
//             description,
//             highlight,
//             highlightDesc,
//             price,
//         } = req.body;

//         const listingPhotos = req.files;

//         if (!listingPhotos || listingPhotos.length === 0) {
//             return res.status(400).send("No file uploaded.");
//         }

//         const listingPhotoPaths = listingPhotos.map((file) => file.path);

//         const newListing = new Listing({
//             creator,
//             category,
//             type,
//             streetAddress,
//             aptSuite,
//             city,
//             province,
//             country,
//             guestCount,
//             bedroomCount,
//             bedCount,
//             bathroomCount,
//             amenities,
//             listingPhotoPaths,
//             title,
//             description,
//             highlight,
//             highlightDesc,
//             price,
//         });

//         // Save the new listing and get the saved object
//         const savedListing = await newListing.save();

//         // Update the user's property list with the new listing ID
//         await User.findByIdAndUpdate(creator, { $push: { propertyList: savedListing._id } });

//         res.status(201).json(savedListing);
//     } catch (err) {
//         res.status(409).json({ message: "Failed to create Listing", error: err.message });
//         console.error(err);
//     }
// });

// /* GET LISTINGS BY CATEGORY */
// router.get("/", async (req, res) => {
//   const qCategory = req.query.category;

//   try {
//     let listings;
//     if (qCategory) {
//       listings = await Listing.find({ category: qCategory }).populate("creator");
//     } else {
//       listings = await Listing.find().populate("creator");
//     }

//     res.status(200).json(listings);
//   } catch (err) {
//     res.status(404).json({ message: "Failed to fetch listings", error: err.message });
//     console.error(err);
//   }
// });

// /* GET LISTINGS BY SEARCH */
// router.get("/search/:search", async (req, res) => {
//   const { search } = req.params;

//   try {
//     let listings = [];

//     if (search === "all") {
//       listings = await Listing.find().populate("creator");
//     } else {
//       listings = await Listing.find({
//         $or: [
//           { category: { $regex: search, $options: "i" } },
//           { title: { $regex: search, $options: "i" } },
//         ],
//       }).populate("creator");
//     }

//     res.status(200).json(listings);
//   } catch (err) {
//     res.status(404).json({ message: "Failed to fetch listings", error: err.message });
//     console.error(err);
//   }
// });

// /* LISTING DETAILS */
// router.get("/:listingId", async (req, res) => {
//   try {
//     const { listingId } = req.params
//     const listing = await Listing.findById(listingId).populate("creator")
//     res.status(202).json(listing)
//   } catch (err) {
//     res.status(404).json({ message: "Listing can not found!", error: err.message })
//   }
// })



/* LISTING DETAILS */
// router.get("/:listingId", async (req, res) => {
//   try {
//     const { listingId } = req.params
//     const listing = await Listing.findById(listingId)
//     res.status(202).json(listing)
//   } catch (err) {
//     res.status(400).json({message: "Listing can not found!", error: err.message})
//   }
// })

// module.exports = router;



// Only admin no host
// const express = require("express");
// const multer = require("multer");
// const Listing = require("../models/Listing");
// const User = require("../models/User");

// const router = express.Router();

// /* Configuration Multer for File Upload */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original file name
//   },
// });

// const upload = multer({ storage });

// /* Middleware to log incoming requests */
// router.use((req, res, next) => {
//   console.log(`Request received: ${req.method} ${req.path}`);
//   next();
// });

// /* CREATE LISTING */
// router.post("/create", upload.array("listingPhotos"), async (req, res) => {
//   try {
//     const {
//       creator,
//       category,
//       type,
//       streetAddress,
//       aptSuite,
//       city,
//       province,
//       country,
//       guestCount,
//       bedroomCount,
//       bedCount,
//       bathroomCount,
//       amenities,
//       title,
//       description,
//       highlight,
//       highlightDesc,
//       price,
//     } = req.body;

//     const listingPhotos = req.files;

//     if (!listingPhotos || listingPhotos.length === 0) {
//       return res.status(400).send("No file uploaded.");
//     }

//     const listingPhotoPaths = listingPhotos.map((file) => file.path);

//     const newListing = new Listing({
//       creator,
//       category,
//       type,
//       streetAddress,
//       aptSuite,
//       city,
//       province,
//       country,
//       guestCount,
//       bedroomCount,
//       bedCount,
//       bathroomCount,
//       amenities,
//       listingPhotoPaths,
//       title,
//       description,
//       highlight,
//       highlightDesc,
//       price,
//     });

//     // Save the new listing and update the user's property list
//     const savedListing = await newListing.save();
//     await User.findByIdAndUpdate(creator, { $push: { propertyList: savedListing._id } });

//     res.status(201).json(savedListing);
//   } catch (err) {
//     res.status(409).json({ message: "Failed to create Listing", error: err.message });
//     console.error(err);
//   }
// });

// /* GET ALL LISTINGS */
// router.get("/", async (req, res) => {
//   try {
//     const listings = await Listing.find().populate("creator");
//     res.status(200).json(listings);
//   } catch (err) {
//     res.status(404).json({ message: "Failed to fetch listings", error: err.message });
//     console.error(err);
//   }
// });


// // /* GET LISTINGS BY SEARCH */
// router.get("/search/:search", async (req, res) => {
//   const { search } = req.params;

//   try {
//     let listings = [];

//     if (search === "all") {
//       listings = await Listing.find().populate("creator");
//     } else {
//       listings = await Listing.find({
//         $or: [
//           { category: { $regex: search, $options: "i" } },
//           { title: { $regex: search, $options: "i" } },
//         ],
//       }).populate("creator");
//     }

//     res.status(200).json(listings);
//   } catch (err) {
//     res.status(404).json({ message: "Failed to fetch listings", error: err.message });
//     console.error(err);
//   }
// });

// /* EDIT LISTING */
// router.put("/:listingId", upload.array("listingPhotos"), async (req, res) => {
//   const { listingId } = req.params;
//   try {
//     const updatedListing = await Listing.findByIdAndUpdate(listingId, req.body, { new: true });
//     res.status(200).json(updatedListing);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to update listing", error: err.message });
//   }
// });



// /* DELETE LISTING */
// router.delete("/:listingId", async (req, res) => {
//   const { listingId } = req.params;
//   try {
//       // Find the listing to get the creator (host)
//       const listing = await Listing.findById(listingId);
//       if (!listing) {
//           return res.status(404).json({ message: "Listing not found" });
//       }

//       // Get the creator's ID
//       const creatorId = listing.creator;

//       // Delete the listing
//       await Listing.findByIdAndDelete(listingId);

//       // Remove the listing ID from the creator's propertyList
//       await User.findByIdAndUpdate(creatorId, { $pull: { propertyList: listingId } });

//       res.status(204).send();
//   } catch (err) {
//       res.status(400).json({ message: "Failed to delete listing", error: err.message });
//   }
// });


// router.put("/:listingId", upload.array("listingPhotos"), async (req, res) => {
//   const { listingId } = req.params;

//   try {
//     const updateData = req.body;
//     if (req.files && req.files.length > 0) {
//       updateData.listingPhotoPaths = req.files.map(file => file.path);
//     }

//     const updatedListing = await Listing.findByIdAndUpdate(listingId, updateData, { new: true });
//     res.status(200).json(updatedListing);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to update listing", error: err.message });
//   }
// }); 


// /* GET LISTING DETAILS */
// router.get("/:listingId", async (req, res) => {
//   try {
//     const { listingId } = req.params;
//     const listing = await Listing.findById(listingId).populate("creator");
//     res.status(200).json(listing);
//   } catch (err) {
//     res.status(404).json({ message: "Listing not found!", error: err.message });
//   }
// });

// module.exports = router; 



// host plus admin
const express = require("express");
const multer = require("multer");
const Listing = require("../models/Listing");
const User = require("../models/User");

const router = express.Router();

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* Middleware to log incoming requests */
router.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.path}`);
  next();
});

/* CREATE LISTING */
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos || listingPhotos.length === 0) {
      return res.status(400).send("No file uploaded.");
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    // Save the new listing and update the user's property list
    const savedListing = await newListing.save();
    await User.findByIdAndUpdate(creator, { $push: { propertyList: savedListing._id } });

    res.status(201).json(savedListing);
  } catch (err) {
    res.status(409).json({ message: "Failed to create Listing", error: err.message });
    console.error(err);
  }
});

/* GET lISTINGS BY CATEGORY */
router.get("/", async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator");
    } else {
      listings = await Listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "Failed to fetch listings", error: err.message });
    console.error(err);
  }
});


/* GET ALL LISTINGS */
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find().populate("creator");
    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "Failed to fetch listings", error: err.message });
    console.error(err);
  }
});




// GET LISTINGS BY HOST
router.get("/host/:hostId", async (req, res) => {
  const { hostId } = req.params;
  try {
    const listings = await Listing.find({ creator: hostId }).populate("creator");
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch host listings", error: err.message });
  }
});


/* GET ALL LISTINGS BY CREATOR */
router.get("/", async (req, res) => {
  try {
    const { creator } = req.query; // Get creator from query params
    const listings = await Listing.find(creator ? { creator } : {}).populate("creator");
    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "Failed to fetch listings", error: err.message });
    console.error(err);
  }
});


// GET LISTINGS FOR LOGGED-IN HOST
router.get("/host/:hostId", async (req, res) => {
  const { hostId } = req.params;

  try {
    const hostListings = await Listing.find({ creator: hostId }).populate("creator");
    res.status(200).json(hostListings);
  } catch (err) {
    console.error("Failed to fetch host properties:", err);
    res.status(500).json({ message: "Error fetching host properties", error: err.message });
  }
});

// /* GET LISTINGS BY SEARCH */
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;

  try {
    let listings = [];

    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator"); 
    }

    res.status(200).json(listings);
  } catch (err) {
    res.status(404).json({ message: "Failed to fetch listings", error: err.message });
    console.error(err);
  }
});



/* DELETE LISTING */
// router.delete("/:listingId", async (req, res) => {
//   const { listingId } = req.params;
//   try {
//       // Find the listing to get the creator (host)
//       const listing = await Listing.findById(listingId);
//       if (!listing) {
//           return res.status(404).json({ message: "Listing not found" });
//       }

//       // Get the creator's ID
//       const creatorId = listing.creator;

//       // Delete the listing
//       await Listing.findByIdAndDelete(listingId);

//       // Remove the listing ID from the creator's propertyList
//       await User.findByIdAndUpdate(creatorId, { $pull: { propertyList: listingId } });

//       res.status(204).send();
//   } catch (err) {
//       res.status(400).json({ message: "Failed to delete listing", error: err.message });
//   }
// });

// // EDITING LISTING
// router.put("/:listingId", upload.array("listingPhotos"), async (req, res) => {
//   const { listingId } = req.params;

//   try {
//     const updateData = req.body;
//     if (req.files && req.files.length > 0) {
//       updateData.listingPhotoPaths = req.files.map(file => file.path);
//     }

//     const updatedListing = await Listing.findByIdAndUpdate(listingId, updateData, { new: true });
//     res.status(200).json(updatedListing);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to update listing", error: err.message });
//   }
// }); 



/* GET ALL THE LISTING DETAILS */
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    res.status(200).json(listing);
  } catch (err) {
    res.status(404).json({ message: "Listing not found!", error: err.message });
  }
});
module.exports = router; 



