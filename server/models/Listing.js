// const mongoose = require("mongoose")

// const ListingSchema = new mongoose.Schema(
//   {
//     creator: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//     category: {
//       type: String,
//       required: true,
//     },
//     type: {
//       type: String,
//       required: true,
//     },
//     streetAddress: {
//       type: String,
//       required: true,
//     },
//     aptSuite: {
//       type: String,
//       required: true,
//     },
//     city: {
//       type: String,
//       required: true,
//     },
//     province: {
//       type: String,
//       required: true,
//     },
//     country: {
//       type: String,
//       required: true,
//     },
//     guestCount: {
//       type: Number,
//       required: true,
//     },
//     bedroomCount: {
//       type: Number,
//       required: true,
//     },
//     bedCount: {
//       type: Number,
//       required: true,
//     },
//     bathroomCount: {
//       type: Number,
//       required: true,
//     },
//     amenities: {
//       type: Array,
//       default:[]
//     },
//     listingPhotoPaths: [{ type: String }], // Store photo URLs
//     title: {
//       type: String,
//       required: true
//     },
//     description: {
//       type: String,
//       required: true
//     },
//     highlight: {
//       type: String,
//       required: true
//     },
//     highlightDesc: {
//       type: String,
//       required: true
//     },
//     price: {
//       type: Number,
//       required: true,
//     }
//   },
//   { timestamps: true}
// )

// const Listing = mongoose.model("Listing", ListingSchema )
// module.exports = Listing

// const mongoose = require("mongoose")

// const ListingSchema = new mongoose.Schema(
//   {
//     creator: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     category: String,
//     type: String,
//     streetAddress: String,
//     aptSuite: String,
//     city: String,
//     province: String,
//     country: String,
//     guestCount: Number,
//     bedroomCount: Number,
//     bedCount: Number,
//     bathroomCount: Number,
//     amenities: { type: Array, default: [] },
//     listingPhotoPaths: [{ type: String }],
//     title: String,
//     description: String,
//     highlight: String,
//     highlightDesc: String,
//     price: Number
//   },
//   { timestamps: true }
// );

// const Listing = mongoose.model("Listing", ListingSchema);
// module.exports = Listing;


// with isbooked implementation:
const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: String,
    type: String,
    streetAddress: String,
    aptSuite: String, 
    city: String,
    province: String,
    country: String,
    guestCount: Number,
    bedroomCount: Number,
    bedCount: Number,
    bathroomCount: Number,
    amenities: { type: Array, default: [] },
    listingPhotoPaths: [{ type: String }],
    title: String,
    description: String,
    highlight: String,
    highlightDesc: String,
    price: Number,
    isBooked: { type: Boolean, default: false }, // New field
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;