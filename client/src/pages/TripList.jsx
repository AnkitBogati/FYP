// import { useEffect, useState } from "react";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setTripList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer";

// const TripList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const tripList = useSelector((state) => state.user.tripList);

//   const dispatch = useDispatch();

//   const getTripList = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/${userId}/trips`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       dispatch(setTripList(data));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Trip List failed!", err.message);
//     }
//   };

//   useEffect(() => {
//     getTripList();
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Trip List</h1>
//       <div className="list">
//          {tripList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
//           <ListingCard
//             listingId={listingId._id}
//             creator={hostId._id}
//             listingPhotoPaths={listingId.listingPhotoPaths}
//             city={listingId.city}
//             province={listingId.province}
//             country={listingId.country}
//             category={listingId.category}
//             startDate={startDate}
//             endDate={endDate}
//             totalPrice={totalPrice}
//             booking={booking}
//           />
//         ))} 
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default TripList;


// import { useEffect, useState } from "react";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setTripList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer";
// import { CheckCircle, Cancel } from "@mui/icons-material";

// const TripList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const tripList = useSelector((state) => state.user.tripList);

//   const dispatch = useDispatch();

//   const getTripList = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/${userId}/trips`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       console.log("Ankit data is :", data)
//       dispatch(setTripList(data));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Trip List failed!", err.message);
//     }
//   };

//   useEffect(() => {
//     getTripList();
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Trip List</h1>
//       <div className="list">
//         {tripList?.map(({ 
//           listingId, 
//           hostId, 
//           startDate, 
//           endDate, 
//           totalPrice, 
//           status,  // Add this
//           booking=true 
//         }) => (
//           <div className="trip-card" key={listingId._id}>
//             <ListingCard
//               listingId={listingId._id}
//               creator={hostId._id}
//               listingPhotoPaths={listingId.listingPhotoPaths}
//               city={listingId.city}
//               province={listingId.province}
//               country={listingId.country}
//               category={listingId.category}
//               startDate={startDate}
//               endDate={endDate}
//               totalPrice={totalPrice}
//               booking={booking}
//             />
//             <div className="booking-status">
//               {status === "accepted" && (
//                 <CheckCircle style={{ color: "green" }} />
//               )}
//               {status === "rejected" && (
//                 <Cancel style={{ color: "red" }} />
//               )}
//               {status === "pending" && (
//                 <span>Waiting for host approval</span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default TripList;

import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList || []);

  const dispatch = useDispatch();

  const getTripList = async () => {
    if (!userId) {
      console.log("User ID is undefined. Cannot fetch trips.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/trips`, {
        method: "GET",
      });

      const data = await response.json();
      console.log("Fetched trip data:", data);
      dispatch(setTripList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Trip List failed!", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTripList();
  }, [userId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {Array.isArray(tripList) && tripList.length > 0 ? (
          tripList.map(({ 
            listingId, 
            hostId, 
            startDate, 
            endDate, 
            totalPrice, 
            bookingStatus, // Ensure this is the correct property
          }) => (
            <div className="trip-card" key={listingId._id}>
              <ListingCard
                listingId={listingId._id}
                creator={hostId._id}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
                booking={true}
                status={bookingStatus} // Pass the booking status
                showGuestInfo={false}
              />
            </div>
          ))
        ) : (
          <p>No trips found.</p>
        )}
      </div>
      <Footer />
    </>
  )
};

export default TripList;