const mongoose = require("mongoose");

const HostSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      approved: {
        type: Boolean,
        default: false,
      },
      listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
    },
    { timestamps: true }
  );
  
  const Host = mongoose.model("Host", HostSchema);
  module.exports = Host;