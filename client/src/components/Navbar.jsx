import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import "../styles/Navbar.scss";
import variables from "../styles/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";


const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const isHost = user?.role === "host";


  // BECOME HOST FUNCTION
  const becomeHost = async () => {
    try {
      if (window.confirm('Are you sure you want to become a host?')){
      const res = await fetch(`http://localhost:3001/users/${user._id}/become-host`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
    

      const data = await res.json();

      if (res.ok) {
        // Update the Redux store with new user role
        dispatch({
          type: "user/setLogin",
          payload: { user: data.updatedUser, token: null }, // keeping token same or null
        });

        // Redirect to /host
        navigate("/host");
      } else {
        alert(data.message || "Failed to become a host.");
      }
    } }catch (err) {
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
        {/* Upload or Become A Host */}

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


