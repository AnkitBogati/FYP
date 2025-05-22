import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import "../styles/Navbar.scss";
import "../styles/Notification.scss";
import variables from "../styles/variables.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const isHost = user?.role === "host";
  const userRole = isHost ? "host" : "customer";

  // Fetch notifications from the server
  const fetchNotifications = async () => {
    if (!user?._id) return;

    try {
      const res = await fetch(`http://localhost:3001/notification/${user._id}`);
      const data = await res.json();
      if (res.ok) {
        setNotifications(data);
      } else {
        console.error("Failed to fetch notifications:", data.message);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Optional: Set up polling to periodically check for new notifications
    const intervalId = setInterval(fetchNotifications, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [user]);

  // Filter notifications based on user role and recipient
  const filteredNotifications = notifications.filter((notif) => {
    // For booking requests, only show to the property owner (hostId)
    if (notif.type === "booking_request") {
      return isHost && notif.hostId === user._id;
    }
    // For booking status updates, only show to the customer/booker (customerId)
    else if (notif.type === "booking_status") {
      return notif.customerId === user._id;
    }

    return false;
  });

  // Count unread notifications
  const unreadCount = filteredNotifications.filter(notif => !notif.isRead).length;

  // Function to mark all notifications as read
  const markAllAsRead = async () => {
    if (!user?._id || unreadCount === 0) return;

    setLoading(true);
    try {
      // Pass the user role as a query parameter
      const res = await fetch(`http://localhost:3001/notification/${user._id}/mark-all-read?role=${userRole}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();

      if (res.ok) {
        // Update only the notifications relevant to this user's role
        setNotifications(prev =>
          prev.map(notif => {
            // Use the same filtering logic as above to determine which notifications to mark as read
            if (
              (isHost && notif.type === "booking_request" && notif.hostId === user._id) ||
              (notif.type === "booking_status" && notif.customerId === user._id)
            ) {
              return { ...notif, isRead: true };
            }
            return notif;
          })
        );
      } else {
        console.error("Failed to mark notifications as read:", data.message);
      }
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    } finally {
      setLoading(false);
    }
  };

  // BECOME HOST FUNCTION
  const becomeHost = async () => {
    try {
      if (window.confirm('Are you sure you want to become a host?')) {
        const res = await fetch(`http://localhost:3001/users/${user._id}/become-host`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          // UPDATE THE REDUX STORE WITH NEW USER ROLE CODE:
          dispatch({
            type: "user/setLogin",
            payload: { user: data.updatedUser, token: null }, // keeping token same or null
          });

          navigate("/create-listing");

          // Redirect to /host
          // navigate("/host");
        } else {
          alert(data.message || "Failed to become a host.");
        }
      }
    } catch (err) {
      console.error("Error becoming host:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search === ""}>
          <Search
            sx={{ color: variables.pinkred }}
            onClick={() => navigate(`/properties/search/${search}`)}
          />
        </IconButton>
      </div>

      <div className="navbar_right">

        <div className="notification-bell">
          <IconButton onClick={() => setNotificationDropdown(!notificationDropdown)}>
            <NotificationsIcon />
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </IconButton>
        </div>

        {notificationDropdown && user && (
          <div className="notification-dropdown">
            <div className="header">
              <h2>Notifications</h2>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Mark all as read"}
                </button>
              )}
            </div>

            {filteredNotifications.length === 0 ? (
              <p>No notifications yet.</p>
            ) : (
              <ul>
                {filteredNotifications.map((notif, idx) => (
                  <li key={idx} className={notif.isRead ? "read" : "unread"}>
                    <h3>{notif.type}</h3>
                    <p>{notif.message}</p>
                    <span>{new Date(notif.createdAt).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )} 

          {/* UPLOAD OR BECOME A HOST CODE:*/}
        {user ? (
          isHost ? (
            <Link to="/create-listing" className="host">Upload Properties</Link>
          ) : (
            <button onClick={becomeHost} className="button">Become A Host</button>
          )
        ) : (
          <Link to="/login" className="host">Become A Host</Link>
        )}


        {/* Avatar button */}
        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace("public", "")}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {/* Dropdown menu */}
        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to={`/${user._id}/trips`}>Trip List</Link>
            <Link to={`/${user._id}/wishList`}>Wish List</Link>

            {isHost && (
              <>
                <Link to={`/${user._id}/properties`}>Property List</Link>
                <Link to={`/${user._id}/reservations`}>Reservation List</Link>
              </>
            )}

            {/* Show "Become A Host" if not already a host */}
            {!isHost && (
              <Link to="/become-host">Become A Host</Link>
            )}

            <Link
              to="/login"
            // onClick={() => {
            //   dispatch(setLogout());
            // }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;


