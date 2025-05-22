// import { useState } from "react";
import "../styles/ListingCard.scss";
import {
  ArrowForwardIos,
  ArrowBackIosNew,
  Favorite,
  Check,
  Close,
  Done,
  Person,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../redux/state";
import { useState } from "react";

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
  startDate,
  endDate,
  totalPrice,
  booking, // Indicates if the listing is booked
  status = "pending", // Booking status
  // User data for reservation
  userId, // Pass the entire userId object instead of extracting parts
  profileImagePath,
  onStatusUpdate,
  reservationId,
  showGuestInfo = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const goToPrevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];
  const isLiked = wishList?.find((item) => item?._id === listingId);

  const patchWishList = async () => {
    if (user?._id !== creator._id) {
      const response = await fetch(
        `http://localhost:3001/users/${user?._id}/${listingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      dispatch(setWishList(data.wishList));
    }
  };

  const handleStatusChange = async (e, newStatus) => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      await onStatusUpdate(reservationId, newStatus); // 👈 calling the parent handler
    } catch (err) {
      console.error("Failed to update status", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusClass = () => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "status-accepted";
      case "cancelled":
        return "status-cancelled";
      case "completed":
        return "status-completed";
      default:
        return "status-pending";
    }
  };

  // Get guest name if available
  const getGuestName = () => {
    if (!userId) return "Guest";

    const firstName = userId.firstName || "";
    const lastName = userId.lastName || "";

    if (firstName || lastName) {
      return `${firstName} ${lastName}`.trim();
    }

    return "Guest";
  };

  return (
    <div className="listing-card" onClick={() => navigate(`/properties/${listingId}`)}>
      <div className="slider-container">
        <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img
                src={`http://localhost:3001/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
              <div
                className="prev-button"
                onClick={goToPrevSlide}
              >
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div
                className="next-button"
                onClick={goToNextSlide}
              >
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3>
        {city}, {province}, {country}
      </h3>
      <p>{category}</p>

      {!booking ? (
        <>
          <p>{type}</p>
          <p><span>Rs{price}</span> per night</p>
        </>
      ) : (
        <>
          <p>{startDate} - {endDate}</p>
          <p><span>Rs{totalPrice}</span> total</p>

          {/* Display guest information */}
          {showGuestInfo && (
            <div className="guest-info" onClick={(e) => e.stopPropagation()}>
              {profileImagePath ? (
                <img
                  src={`http://localhost:3001/${profileImagePath.replace("public", "")}`}
                  alt="Guest"
                  className="guest-avatar"
                />
              ) : (
                <Person sx={{ fontSize: "16px" }} />
              )}
              <span>Booked by: {getGuestName()}</span>
            </div>
          )}



          {/* Status indicator */}
          <div className={`status-indicator ${getStatusClass()}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>

          {/* Action buttons */}
          {onStatusUpdate && (
            <div className="reservation-actions" onClick={(e) => e.stopPropagation()}>
              {status === "pending" && (
                <>
                  <button
                    className="accept-btn"
                    onClick={(e) => handleStatusChange(e, "accepted")}
                    disabled={isLoading}
                  >
                    <Check fontSize="small" /> Confirm
                  </button>
                  <button
                    className="reject-btn"
                    onClick={(e) => handleStatusChange(e, "rejected")}
                    disabled={isLoading}
                  >
                    <Close fontSize="small" /> Reject
                  </button>
                </>
              )}

              {status === "accepted" && (
                <button
                  className="complete-btn"
                  onClick={(e) => handleStatusChange(e, "completed")}
                  disabled={isLoading}
                >
                  <Done fontSize="small" /> Complete
                </button>
              )}
            </div>
          )}

        </>
      )}

      <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
          patchWishList();
        }}
        disabled={!user}
      >
        {isLiked ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <Favorite sx={{ color: "white" }} />
        )}
      </button>
    </div>
  );
};

export default ListingCard;