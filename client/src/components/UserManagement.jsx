// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
// import axios from 'axios';

// const UserManagement = () => {
//     const [users, setUsers] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState({ 
//         firstName: '', 
//         lastName: '', 
//         email: '', 
//         password: '', 
//         role: '', 
//         profileImage: null 
//     });
//     const [editingUserId, setEditingUserId] = useState(null);

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         const response = await axios.get('http://localhost:3001/users');
//         setUsers(response.data);
//     };

//     const handleEditUser = (user) => {
//         setFormData({ 
//             firstName: user.firstName, 
//             lastName: user.lastName, 
//             email: user.email, 
//             role: user.role, 
//             profileImage: null 
//         });
//         setEditingUserId(user._id);
//         setOpen(true);
//     };

//     const handleDeleteUser = async (userId) => {
//         await axios.delete(`http://localhost:3001/users/${userId}`);
//         fetchUsers(); // Refresh user list
//     };

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: name === "profileImage" ? files[0] : value,
//         }));
//     };

//     const handleSubmit = async () => {
//         const userFormData = new FormData();
//         for (const key in formData) {
//             userFormData.append(key, formData[key]);
//         }

//         try {
//             if (editingUserId) {
//                 await axios.put(`http://localhost:3001/users/${editingUserId}`, userFormData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });
//             } else {
//                 await axios.post('http://localhost:3001/users', userFormData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 });
//             }
//             setOpen(false);
//             fetchUsers(); // Refresh user list
//         } catch (error) {
//             console.error("Error saving user:", error.response.data);
//         }
//     };

//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>User Management</Typography>
//             <Button variant="contained" color="primary" onClick={() => { 
//                 setFormData({ firstName: '', lastName: '', email: '', password: '', role: '', profileImage: null }); 
//                 setEditingUserId(null);
//                 setOpen(true); 
//             }}>
//                 Add User
//             </Button>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>First Name</TableCell>
//                             <TableCell>Last Name</TableCell>
//                             <TableCell>Email</TableCell>
//                             <TableCell>Role</TableCell>
//                             <TableCell>Profile Image Path</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {users.map(user => (
//                             <TableRow key={user._id}>
//                                 <TableCell>{user.firstName}</TableCell>
//                                 <TableCell>{user.lastName}</TableCell>
//                                 <TableCell>{user.email}</TableCell>
//                                 <TableCell>{user.role}</TableCell>
//                                 <TableCell>{user.profileImagePath}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="primary" onClick={() => handleEditUser(user)}>Edit</Button>
//                                     <Button variant="contained" color="secondary" onClick={() => handleDeleteUser(user._id)} style={{ marginLeft: "10px" }}>Delete</Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* Edit/Add User Dialog */}
//             <Dialog open={open} onClose={() => setOpen(false)}>
//                 <DialogTitle>{editingUserId ? "Edit User" : "Add User"}</DialogTitle>
//                 <DialogContent>
//                     <TextField 
//                         fullWidth 
//                         label="First Name" 
//                         name="firstName"
//                         value={formData.firstName} 
//                         onChange={handleChange} 
//                         margin="dense" 
//                     />
//                     <TextField 
//                         fullWidth 
//                         label="Last Name" 
//                         name="lastName"
//                         value={formData.lastName} 
//                         onChange={handleChange} 
//                         margin="dense" 
//                     />
//                     <TextField 
//                         fullWidth 
//                         label="Email" 
//                         name="email"
//                         value={formData.email} 
//                         onChange={handleChange} 
//                         margin="dense" 
//                         disabled={editingUserId !== null} 
//                     />
//                     <TextField 
//                         fullWidth 
//                         label="Password" 
//                         type="password" 
//                         name="password"
//                         value={formData.password} 
//                         onChange={handleChange} 
//                         margin="dense" 
//                         required={editingUserId === null} 
//                     />
//                     <TextField 
//                         fullWidth 
//                         label="Role" 
//                         name="role"
//                         value={formData.role} 
//                         onChange={handleChange} 
//                         margin="dense" 
//                     />
//                     <input 
//                         id="image" 
//                         type="file" 
//                         name="profileImage" 
//                         accept="image/*" 
//                         onChange={handleChange} 
//                         required 
//                     />
//                     {formData.profileImage && (
//                         <img src={URL.createObjectURL(formData.profileImage)} alt='profile photo' style={{ maxWidth: "84px" }} />
//                     )}
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpen(false)}>Cancel</Button>
//                     <Button color="primary" variant="contained" onClick={handleSubmit}>
//                         {editingUserId ? "Save" : "Add"}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Container>
//     );
// };

// export default UserManagement;














// FOURTH TRY USING ADVANCED FILTERS IN USER CARD IT HAS CSS IN SEPERATE FILE
import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Grid, Card, CardMedia, CardContent, CardActions,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton, Button, InputAdornment
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';
import axios from 'axios';
import '../styles/UserManagement.scss'; 

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        profileImage: null
    });
    const [editingUserId, setEditingUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        handleSearch(searchTerm);
    }, [users, searchTerm]);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
    };

    const handleEditUser = (user) => {
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            password: '',
            profileImage: null
        });
        setEditingUserId(user._id);
        setOpen(true);
    };


    const handleDeleteUser = async (userId) => {
        // Show confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        
        if (isConfirmed) {
          try {
            await axios.delete(`http://localhost:3001/users/${userId}`);
            fetchUsers();
          } catch (error) {
            console.error("Error deleting user:", error);
          }
        }
      };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "profileImage" ? files[0] : value,
        }));
    };

    const handleSubmit = async () => {
        const userFormData = new FormData();
        for (const key in formData) {
            userFormData.append(key, formData[key]);
        }

        try {
            if (editingUserId) {
                await axios.put(`http://localhost:3001/users/${editingUserId}`, userFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await axios.post('http://localhost:3001/users', userFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            setOpen(false);
            fetchUsers();
        } catch (error) {
            console.error("Error saving user:", error.response?.data || error.message);
        }
    };

    const handleSearch = (query) => {
        setSearchTerm(query);
        const filtered = users.filter(user =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase()) ||
            user.email.toLowerCase().includes(query.toLowerCase()) ||
            user.role.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    return (
        <Container className="user-management-container">
            <Typography variant="h4" gutterBottom>User Management</Typography>

            <div className="user-management-toolbar">
                <TextField
                    placeholder="Search by name, email, role..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    variant="outlined"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        )
                    }}
                    className="search-input"
                />
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    color="primary"
                    onClick={() => {
                        setFormData({ firstName: '', lastName: '', email: '', password: '', role: '', profileImage: null });
                        setEditingUserId(null);
                        setOpen(true);
                    }}
                >
                    Add User
                </Button>
            </div>

            <Grid container spacing={3} className="user-cards-grid">
                {filteredUsers.map(user => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
                        <Card className="user-card">
                            <CardMedia
                                component="img"
                                height="200"
                                image={`http://localhost:3001/${user.profileImagePath?.replace(/^public[\\/]/, "")}`}
                                alt={`${user.firstName} ${user.lastName}`}
                            />
                            <CardContent>
                                <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                                <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                                <Typography variant="body2" color="textSecondary">Role: {user.role}</Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton color="primary" onClick={() => handleEditUser(user)}>
                                    <Edit />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDeleteUser(user._id)}>
                                    <Delete />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editingUserId ? "Edit User" : "Add User"}</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} margin="dense" />
                    <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} margin="dense" />
                    <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} margin="dense" disabled={editingUserId !== null} />
                    <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} margin="dense" required={editingUserId === null} />
                    <TextField fullWidth label="Role" name="role" value={formData.role} onChange={handleChange} margin="dense" />
                    <input type="file" name="profileImage" accept="image/*" onChange={handleChange} required={editingUserId === null} className="file-input" />
                    {formData.profileImage && (
                        <img src={URL.createObjectURL(formData.profileImage)} alt="preview" className="preview-image" />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button color="primary" variant="contained" onClick={handleSubmit}>
                        {editingUserId ? "Save" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserManagement;
