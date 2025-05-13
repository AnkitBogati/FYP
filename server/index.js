// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();
// const cors = require("cors");

// const authRoutes = require("./routes/auth.js")
// const listingRoutes = require("./routes/listing.js")
// const bookingRoutes = require("./routes/booking.js")
// const userRoutes = require("./routes/user.js")
// const adminHostRoutes = require("./routes/adminHostRoutes");
// const adminRoutes = require("./routes/adminRoutes");





// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));

// /* ROUTES */
// app.use("/auth", authRoutes)
// app.use("/properties", listingRoutes)
// app.use("/bookings", bookingRoutes)
// app.use("/users", userRoutes)
// app.use("/admin", adminHostRoutes);
// app.use("/admin", adminRoutes);


// // MongoDB setup
// const PORT = 3001;
// mongoose.connect(process.env.MONGO_URL, {
//     dbName: 'herald',
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
//   })
//   .catch((err) => console.log(`${err} Your database did not connect sorry`));
   

// index.js
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config(); 
const cors = require("cors");

// Import route modules
const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes); 
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes); 
app.use("/users", userRoutes);

// MongoDB setup
const PORT = 3001;
mongoose.connect(process.env.MONGO_URL, {
    dbName: 'herald',
})
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} Your database did not connect, sorry`));


// Sockets.io 
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const dotenv = require("dotenv").config(); 
// const cors = require("cors");
// const http = require("http"); // Add this for Socket.io

// // Import route modules
// const authRoutes = require("./routes/auth.js");
// const listingRoutes = require("./routes/listing.js");
// const bookingRoutes = require("./routes/booking.js");
// const userRoutes = require("./routes/user.js");
// const notificationRoutes = require("./routes/notification.js");

// // Middleware
// app.use(cors({
//   origin: "http://localhost:3000", // Explicitly allow your client origin
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.static("public"));

// /* ROUTES */
// app.use("/auth", authRoutes); 
// app.use("/properties", listingRoutes);
// app.use("/bookings", bookingRoutes); 
// app.use("/users", userRoutes);
// app.use("/notifications", notificationRoutes); // Changed this path to be more RESTful

// // Socket.io setup
// const server = http.createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// // Socket.io connection handler
// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id); 

//   // Join room based on userId
//   socket.on("join-user-room", (userId) => {
//     socket.join(userId);
//     console.log(`User ${userId} joined their room`);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// // Make io accessible to routes
// app.set("io", io);

// // MongoDB setup
// const PORT = 3001;
// mongoose.connect(process.env.MONGO_URL, {
//     dbName: 'herald',
// })
//   .then(() => {
//     server.listen(PORT, () => console.log(`Server running on port: ${PORT}`)); // Changed from app.listen to server.listen
//   })
//   .catch((err) => console.log(`${err} Your database did not connect, sorry`));