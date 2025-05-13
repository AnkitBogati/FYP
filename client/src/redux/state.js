// import { createSlice} from "@reduxjs/toolkit"

// const initialState = {
//   user: null,
//   token: null
// }

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setLogin: (state, action) => {
//       state.user = action.payload.user
//       state.token = action.payload.token
//     },
//     setLogout: (state) => {
//       state.user = null
//       state.token = null
//     },
//     setListings: (state, action) => {
//       state.listings = action.payload.listings
//     },
    // setTripList: (state, action) => {
    //   state.user.tripList = action.payload
    // },
    // setWishList: (state, action) => {
    //   state.user.wishList = action.payload
    // },
    // setPropertyList: (state, action) => {
    //   state.user.propertyList = action.payload
    // },
    // setReservationList: (state, action) => {
    //   state.user.reservationList = action.payload
    // }
//     setTripList: (state, action) => {
//       if (state.user) {
//         state.user.tripList = action.payload;
//       }
//     },
//     setWishList: (state, action) => {
//       if (state.user) {
//         state.user.wishList = action.payload;
//       }
//     },
//     setPropertyList: (state, action) => {
//       if (state.user) {
//         state.user.propertyList = action.payload;
//       }
//     },
//     setReservationList: (state, action) => {
//       if (state.user) {
//         state.user.reservationList = action.payload;
//       }
//     }
    
//   }
// })

// export const { setLogin, setLogout, setListings, setTripList, setWishList, setPropertyList, setReservationList } = userSlice.actions
// export default userSlice.reducer


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  tripList: [], // Initialize tripList as an empty array
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.tripList = []; // Clear tripList on logout
    },
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
    setTripList: (state, action) => {
      if (state.user) {
        state.user.tripList = action.payload; // Ensure this updates correctly
      } else {
        state.tripList = action.payload; // Handle case when user is null
      }
    },
    setWishList: (state, action) => {
      if (state.user) {
        state.user.wishList = action.payload;
      }
    },
    setPropertyList: (state, action) => {
      if (state.user) {
        state.user.propertyList = action.payload;
      }
    },
    setReservationList: (state, action) => {
      if (state.user) {
        state.user.reservationList = action.payload;
      }
    },
  },
});

export const { 
  setLogin, 
  setLogout, 
  setListings, 
  setTripList, 
  setWishList, 
  setPropertyList, 
  setReservationList 
} = userSlice.actions;

export default userSlice.reducer;