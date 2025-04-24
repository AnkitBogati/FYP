// import { useEffect, useState } from "react";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setReservationList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer"

// const ReservationList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const reservationList = useSelector((state) => state.user.reservationList);

//   const dispatch = useDispatch();

//   const getReservationList = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/${userId}/reservations`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       console.log("reservation data : ", DataTransferItem)
//       console.log(data)
//       dispatch(setReservationList(data));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Reservation List failed!", err.message);
//     }
//   };

//   useEffect(() => {
//     getReservationList();
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Reservation List</h1>
//       <div className="list">
//         {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true }) => (
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

// export default ReservationList;






import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const reservationList = useSelector((state) => state.user.reservationList);

  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/reservations`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log("Reservation data:", data);
      dispatch(setReservationList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Reservation List failed!", err.message);
    }
  };

  const handleStatusUpdate = async (reservationId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3001/bookings/${reservationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        // Refresh reservation list after status update
        getReservationList();
      } else {
        console.log("Failed to update reservation status");
      }
    } catch (err) {
      console.log("Update reservation status failed!", err.message);
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Property Reservations</h1>
      
      {/* Debug information */}
      {reservationList && reservationList.length > 0 && (
        <div style={{ display: 'none' }}>
          {console.log("First reservation:", reservationList[0])}
        </div>
      )}
      
      <div className="list">
        {reservationList?.map((reservation) => (
          <ListingCard
            key={reservation._id}
            reservationId={reservation._id}
            listingId={reservation.listingId?._id}
            creator={reservation.hostId}
            listingPhotoPaths={reservation.listingId?.listingPhotoPaths || []}
            city={reservation.listingId?.city || ""}
            province={reservation.listingId?.province || ""}
            country={reservation.listingId?.country || ""}
            category={reservation.listingId?.category || ""}
            startDate={reservation.startDate}
            endDate={reservation.endDate}
            totalPrice={reservation.totalPrice}
            booking={true}
            status={reservation.bookingStatus || "pending"}

           
            // Pass the entire userId object
            userId={reservation.customerId}
            profileImagePath={reservation.customerId?.profileImagePath}
            onStatusUpdate={handleStatusUpdate}
            showGuestInfo={true}
          />
        ))}
      </div>
      <Footer /> 
    </>
  );
};

export default ReservationList;

// import { useEffect, useState } from "react";
// import "../styles/List.scss";
// import Loader from "../components/Loader";
// import Navbar from "../components/Navbar";
// import { useDispatch, useSelector } from "react-redux";
// import { setReservationList } from "../redux/state";
// import ListingCard from "../components/ListingCard";
// import Footer from "../components/Footer";

// const ReservationList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const reservationList = useSelector((state) => state.user.reservationList);

//   const dispatch = useDispatch();

//   const getReservationList = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3001/users/${userId}/reservations`,
//         {
//           method: "GET",
//         }
//       );

//       const data = await response.json();
//       console.log(data);
//       dispatch(setReservationList(data));
//       setLoading(false);
//     } catch (err) {
//       console.log("Fetch Reservation List failed!", err.message);
//     }
//   };

//   useEffect(() => {
//     getReservationList();
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <h1 className="title-list">Your Reservation List</h1>
//       <div className="list">
//         {reservationList?.map(({ listingId, hostId, startDate, endDate, totalPrice, customerId }) => (
//           <ListingCard
//             key={listingId._id}
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
//             bookedBy={`${customerId.firstName} ${customerId.lastName}`}  // Pass customer name
//             booking={true}
//           />
//         ))}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ReservationList;