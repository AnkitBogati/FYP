// import React, { useState } from 'react';
// import "../styles/Login.scss"
// import { setLogin } from '../redux/state';
// import { useDispatch }from "react-redux";
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault()



//     try {
//       const response = await fetch ("http://localhost:3001/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email, password })
//       })

//       /* Get data fetching */
//       const loggedIn = await response.json()
      
//       if(loggedIn) {
//         dispatch(
//           setLogin({
//             user: loggedIn.user,
//             token: loggedIn.token
//           })
//         )
//         navigate("/")
//       }

//     } catch (err) {
//       console.log("Login failed", err.message);
//     }
//   }

//   return (
//     <div className="login">
//       <div className="login_content">
//         <form className="login_content_form" onSubmit={handleSubmit} >
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input 
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">LOG IN</button>
//         </form>
//         <a href="/register">Don't have an account? Sign In Here</a>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// import React, { useState } from 'react';
// import "../styles/Login.scss";
// import { setLogin } from '../redux/state';
// import { useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3001/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ email, password })
//       });

//       /* Get data fetching */
//       const loggedIn = await response.json();

//       if (loggedIn) {
//         dispatch(setLogin({
//           user: loggedIn.user,
//           token: loggedIn.token
//         }));

//         // Check if the user is the admin
//         if (email === "ramkumar@gmail.com" && password === "ramkumar123") {
//           navigate("/admin"); // Redirect to Admin Dashboard
//         } else {
//           navigate("/"); // Redirect to home page for other users
//         }
//       }

//     } catch (err) {
//       console.log("Login failed", err.message);
//     }
//   };

//   return (
//     <div className="login">
//       <div className="login_content">
//         <form className="login_content_form" onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input 
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit">LOG IN</button>
//         </form>
//         <a href="/register">Don't have an account? Sign In Here</a>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from 'react';
import "../styles/Login.scss";
import { setLogin } from '../redux/state';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // State to toggle between user and admin

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const loggedIn = await response.json();

      if (response.ok) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        );

        // Redirect based on role
        if (loggedIn.user.role === "admin") {
          navigate("/admin"); // Redirect admin to dashboard
        } else if (loggedIn.user.role === "host"){
          navigate("/host"); // Redirect user to homepage
        } else {
          navigate("/");
        } 
      } else {
        alert(loggedIn.message || "Login failed. Please try again."); // Show error message
      }
    } catch (err) {
      console.log("Login failed", err.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
            />
            Admin Login
          </label>
        </div>
        <a href="/register">Don't have an account? Sign Up Here</a>
      </div>
    </div>
  );
};

export default LoginPage;