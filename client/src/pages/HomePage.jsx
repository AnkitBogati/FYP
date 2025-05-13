// import React from 'react'
// import Navbar from '../components/Navbar';
// import Slide from '../components/Slide';
// import Categories from '../components/Categories'
// import Listings from '../components/Listings';
// import Footer from '../components/Footer';
// const HomePage = () => {
//   return (
//    <>
//    <Navbar />
//    <Slide />
//    <Categories />
//    <Listings />
//    <Footer />
//    </>
//   )
// }

// export default HomePage;

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Slide from '../components/Slide';
import Categories from '../components/Categories';
import Listings from '../components/Listings';
import Footer from '../components/Footer';

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'host') {
        navigate('/host'); // Redirect to host dashboard
      } else if (user.role === 'admin') {
        navigate('/admin'); // Redirect to admin dashboard
      }
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <Slide />
      <Categories />
      <Listings />
      <Footer />
    </>
  );
}

export default HomePage;