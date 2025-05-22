// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
// import '../styles/AdminDashboard.scss';

// const AdminDashboard = () => {
//     const [backgroundImage, setBackgroundImage] = useState("");

//     useEffect(() => {
//         // Fetch a random background image from Unsplash or any preferred source
//         const fetchBackground = async () => {
//             try {
//                 const response = await fetch("https://source.unsplash.com/1600x900/?real-estate,office");
//                 setBackgroundImage(response.url);
//             } catch (error) {
//                 console.error("Error fetching background image:", error);
//             }
//         };

//         fetchBackground();
//     }, []);

//     return (
//         <Container style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//             <Typography variant="h4" gutterBottom>
//                 Admin Dashboard
//             </Typography>
//             <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <Card className="dashboard-card user-management">
//                         <CardContent>
//                             <Typography variant="h5">Users & auth Management</Typography>
//                             <Link to="/admin/users">Manage Users</Link>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <Card className="dashboard-card property-management">
//                         <CardContent>
//                             <Typography variant="h5">Property Management</Typography>
//                             <Link to="/admin/properties">Manage Properties</Link>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <Card className="dashboard-card booking-management">
//                         <CardContent>
//                             <Typography variant="h5">Booking Management</Typography>
//                             <Link to="/admin/bookings">Manage Bookings</Link>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <Card className="dashboard-card analytics-reports">
//                         <CardContent>
//                             <Typography variant="h5">Analytics & Reports</Typography>
//                             <Link to="/admin/analytics">View Reports</Link>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default AdminDashboard;


import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import '../styles/AdminDashboard.scss';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
    return (
        <>
        <Navbar />
        <div className="admin-dashboard">
            <Container maxWidth="lg">
                <Typography variant="h4" className="dashboard-title">
                    Admin Dashboard
                </Typography>
                <Grid container spacing={3} justifyContent="center" className="dashboard-grid">
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="dashboard-card">
                            <CardContent>
                                <span className="icon">👤</span>
                                <Typography variant="h6">User and auth Management</Typography>
                                <Link to="/admin/users">Go to Users</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="dashboard-card">
                            <CardContent>
                                <span className="icon">🏠</span>
                                <Typography variant="h6">Properties Management</Typography>
                                <Link to="/admin/properties">View Properties</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="dashboard-card">
                            <CardContent>
                                <span className="icon">📅</span>
                                <Typography variant="h6">Bookings Management</Typography>
                                <Link to="/admin/bookings">Manage Bookings</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card className="dashboard-card">
                            <CardContent>
                                <span className="icon">📊</span>
                                <Typography variant="h6">Reports Management</Typography>
                                <Link to="/admin/analytics">View Reports</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
        </>
    );
};

export default AdminDashboard;



