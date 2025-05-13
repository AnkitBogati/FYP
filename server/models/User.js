// const mongoose = require("mongoose")

// const UserSchema = new mongoose.Schema(
//     {
//         firstName:{
//             type:String,
//             required: true,
//         },
//         lastName:{
//             type:String,
//             required:true,
//         },
//         email:{
//             type:String,
//             required:true,
//             unique:true,
//         },
//         password:{
//             type:String,
//             required:true,
//         },
//         profileImagePath: {
//             type: String,
//             default: "",
//         },
//         tripList: {
//             type: Array,
//             default: [],
//         },
//         wishList: {
//             type: Array,
//             default: [],
//         },
//         propertyList: {
//             type: Array,
//             default: [],
//         },
//         reservationList: {
//             type: Array,
//             default: [],
//         }
//     },
//     { timestamps: true}
// )

// const User = mongoose.model("User", UserSchema)
// module.exports = User

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "host", "admin"],
            default: "user",
        },
        profileImagePath: {
            type: String,
            default: "",
        },
        tripList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
        wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
        propertyList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
        reservationList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }]
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;