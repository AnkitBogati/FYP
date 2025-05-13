// router got mistake listings instead of properties
// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
// import axios from 'axios';

// const PropertyManagement = () => {
//     const [properties, setProperties] = useState([]);
//     const [hosts, setHosts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         price: '',
//         creator: '',
//         // Add other necessary fields
//     });
//     const [editingPropertyId, setEditingPropertyId] = useState(null);

//     useEffect(() => {
//         fetchProperties();
//         fetchHosts();
//     }, []);

//     const fetchProperties = async () => {
//         const response = await axios.get('http://localhost:3001/listings');
//         setProperties(response.data);
//     };

//     const fetchHosts = async () => {
//         const response = await axios.get('http://localhost:3001/users'); // Adjust the endpoint as necessary
//         setHosts(response.data);
//     };

//     const handleEditProperty = (property) => {
//         setFormData({
//             title: property.title,
//             description: property.description,
//             price: property.price,
//             creator: property.creator,
//             // Set other fields as necessary
//         });
//         setEditingPropertyId(property._id);
//         setOpen(true);
//     };

//     const handleDeleteProperty = async (propertyId) => {
//         if (window.confirm("Are you sure you want to delete this property?")) {
//             await axios.delete(`http://localhost:3001/listings/${propertyId}`);
//             fetchProperties(); // Refresh property list
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async () => {
//         try {
//             if (editingPropertyId) {
//                 await axios.put(`http://localhost:3001/listings/${editingPropertyId}`, formData);
//             } else {
//                 await axios.post('http://localhost:3001/listings/create', formData);
//             }
//             setOpen(false);
//             fetchProperties(); // Refresh property list
//         } catch (error) {
//             console.error("Error saving property:", error.response.data);
//         }
//     };

//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>Property Management</Typography>
//             <Button variant="contained" color="primary" onClick={() => { 
//                 setFormData({ title: '', description: '', price: '', creator: '' }); 
//                 setEditingPropertyId(null);
//                 setOpen(true); 
//             }}>
//                 Add Property
//             </Button>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Title</TableCell>
//                             <TableCell>Price</TableCell>
//                             <TableCell>Creator</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {properties.map(property => (
//                             <TableRow key={property._id}>
//                                 <TableCell>{property.title}</TableCell>
//                                 <TableCell>{property.price}</TableCell>
//                                 <TableCell>{property.creator?.firstName} {property.creator?.lastName}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="primary" onClick={() => handleEditProperty(property)}>Edit</Button>
//                                     <Button variant="contained" color="secondary" onClick={() => handleDeleteProperty(property._id)} style={{ marginLeft: "10px" }}>Delete</Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* Edit/Add Property Dialog */}
//             <Dialog open={open} onClose={() => setOpen(false)}>
//                 <DialogTitle>{editingPropertyId ? "Edit Property" : "Add Property"}</DialogTitle>
//                 <DialogContent>
//                     <TextField 
//                         fullWidth 
//                         label="Title" 
//                         name="title"
//                         value={formData.title} 
//                         onChange={handleChange} 
//                         margin="dense" 
//                     />
//                     <TextField 
//                         fullWidth 
//                         label="Description" 
//                         name="description"
//                         value={formData.description} 
//                         onChange={handleChange} 
//                         margin="dense" 
//                     />
//                     <TextField 
//                         fullWidth 
//                         label="Price" 
//                         name="price"
//                         type="number"
//                         value={formData.price} 
//                         onChange={handleChange} 
//                         margin="dense" 
//                     />
//                     <TextField
//                         select
//                         fullWidth
//                         label="Host"
//                         name="creator"
//                         value={formData.creator}
//                         onChange={handleChange}
//                         SelectProps={{
//                             native: true,
//                         }}
//                     >
//                         <option value=""></option>
//                         {hosts.map(host => (
//                             <option key={host._id} value={host._id}>{host.firstName} {host.lastName}</option>
//                         ))}
//                     </TextField>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpen(false)}>Cancel</Button>
//                     <Button color="primary" variant="contained" onClick={handleSubmit}>
//                         {editingPropertyId ? "Save" : "Add"}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Container>
//     );
// };

// export default PropertyManagement; 



// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
// import axios from 'axios';

// const PropertyManagement = () => {
//     const [properties, setProperties] = useState([]);
//     const [hosts, setHosts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         price: '',
//         creator: '',
//     });
//     const [editingPropertyId, setEditingPropertyId] = useState(null);

//     useEffect(() => {
//         fetchProperties();
//         fetchHosts();
//     }, []);

//     const fetchProperties = async () => {
//         try {
//             const response = await axios.get('http://localhost:3001/properties'); // Ensure this matches the backend
//             setProperties(response.data);
//         } catch (error) {
//             console.error("Error fetching properties:", error);
//         }
//     };

//     const fetchHosts = async () => {
//         const response = await axios.get('http://localhost:3001/users'); // Adjust if necessary
//         setHosts(response.data);
//     };

//     const handleEditProperty = (property) => {
//         setFormData({
//             title: property.title,
//             description: property.description,
//             price: property.price,
//             creator: property.creator,
//         });
//         setEditingPropertyId(property._id);
//         setOpen(true);
//     };

//     const handleDeleteProperty = async (propertyId) => {
//         if (window.confirm("Are you sure you want to delete this property?")) {
//             await axios.delete(`http://localhost:3001/properties/${propertyId}`);
//             fetchProperties(); // Refresh property list
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async () => {
//         try {
//             if (editingPropertyId) {
//                 await axios.put(`http://localhost:3001/properties/${editingPropertyId}`, formData);
//             } else {
//                 await axios.post('http://localhost:3001/properties/create', formData);
//             }
//             setOpen(false);
//             fetchProperties(); // Refresh property list
//         } catch (error) {
//             console.error("Error saving property:", error.response.data);
//         }
//     };

//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>Property Management</Typography>
//             <Button variant="contained" color="primary" onClick={() => { 
//                 setFormData({ title: '', description: '', price: '', creator: '' }); 
//                 setEditingPropertyId(null);
//                 setOpen(true); 
//             }}>
//                 Add Property
//             </Button>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Title</TableCell>
//                             <TableCell>Price</TableCell>
//                             <TableCell>Creator</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {properties.map(property => (
//                             <TableRow key={property._id}>
//                                 <TableCell>{property.title}</TableCell>
//                                 <TableCell>{property.price}</TableCell>
//                                 <TableCell>{property.creator?.firstName} {property.creator?.lastName}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="primary" onClick={() => handleEditProperty(property)}>Edit</Button>
//                                     <Button variant="contained" color="secondary" onClick={() => handleDeleteProperty(property._id)} style={{ marginLeft: "10px" }}>Delete</Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* Edit/Add Property Dialog */}
//             <Dialog open={open} onClose={() => setOpen(false)}>
//                 <DialogTitle>{editingPropertyId ? "Edit Property" : "Add Property"}</DialogTitle>
//                 <DialogContent>
//                     <TextField 
//                         fullWidth 
//                         label="Title" 
//                         name="title"
//                         value={formData.title} 
//                         onChange={handleChange} 
//                         margin="dense" 
//                     />
//                     <TextField 
//                         fullWidth 
//                         label="Description" 
//                         name="description"
//                         value={formData.description} 
//                         onChange={handleChange} 
//                         margin="dense" 
//                     />
//                     <TextField 
//                         fullWidth 
//                         label="Price" 
//                         name="price"
//                         type="number"
//                         value={formData.price} 
//                         onChange={handleChange} 
//                         margin="dense" 
//                     />
//                     <TextField
//                         select
//                         fullWidth
//                         label="Host"
//                         name="creator"
//                         value={formData.creator}
//                         onChange={handleChange}
//                         SelectProps={{
//                             native: true,
//                         }}
//                     >
//                         <option value="">Select Host</option>
//                         {hosts.map(host => (
//                             <option key={host._id} value={host._id}>{host.firstName} {host.lastName}</option>
//                         ))}
//                     </TextField>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpen(false)}>Cancel</Button>
//                     <Button color="primary" variant="contained" onClick={handleSubmit}>
//                         {editingPropertyId ? "Save" : "Add"}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Container>
//     );
// };

// export default PropertyManagement;





// // working fine but no photos functionalities here.
// import React, { useState, useEffect } from 'react';
// import {
//     Container,
//     Typography,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     Checkbox,
//     FormControlLabel,
// } from '@mui/material';
// import axios from 'axios';

// const PropertyManagement = () => {
//     const [properties, setProperties] = useState([]);
//     const [hosts, setHosts] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         price: '',
//         creator: '',
//         category: '',
//         type: '',
//         streetAddress: '',
//         aptSuite: '',
//         city: '',
//         province: '',
//         country: '',
//         guestCount: '',
//         bedroomCount: '',
//         bedCount: '',
//         bathroomCount: '',
//         amenities: '',
//         listingPhotoPaths: [],
//         isBooked: false,
//     });
//     const [editingPropertyId, setEditingPropertyId] = useState(null);

//     useEffect(() => {
//         fetchProperties();
//         fetchHosts();
//     }, []);

//     const fetchProperties = async () => {
//         try {
//             const response = await axios.get('http://localhost:3001/properties');
//             setProperties(response.data);
//         } catch (error) {
//             console.error("Error fetching properties:", error);
//         }
//     };

//     const fetchHosts = async () => {
//         const response = await axios.get('http://localhost:3001/users');
//         setHosts(response.data);
//     };

//     const handleEditProperty = (property) => {
//         setFormData({
//             title: property.title,
//             description: property.description,
//             price: property.price,
//             creator: property.creator,
//             category: property.category,
//             type: property.type,
//             streetAddress: property.streetAddress,
//             aptSuite: property.aptSuite,
//             city: property.city,
//             province: property.province,
//             country: property.country,
//             guestCount: property.guestCount,
//             bedroomCount: property.bedroomCount,
//             bedCount: property.bedCount,
//             bathroomCount: property.bathroomCount,
//             amenities: property.amenities.join(', '), // Convert array to string for input
//             listingPhotoPaths: property.listingPhotoPaths,
//             isBooked: property.isBooked,
//         });
//         setEditingPropertyId(property._id);
//         setOpen(true);
//     };

//     const handleDeleteProperty = async (propertyId) => {
//         if (window.confirm("Are you sure you want to delete this property?")) {
//             await axios.delete(`http://localhost:3001/properties/${propertyId}`);
//             fetchProperties(); // Refresh property list
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: type === 'checkbox' ? checked : value,
//         }));
//     };

//     const handleSubmit = async () => {
//         try {
//             if (editingPropertyId) {
//                 await axios.put(`http://localhost:3001/properties/${editingPropertyId}`, formData);
//             } else {
//                 await axios.post('http://localhost:3001/properties/create', formData);
//             }
//             setOpen(false);
//             fetchProperties(); // Refresh property list
//         } catch (error) {
//             console.error("Error saving property:", error.response.data);
//         }
//     };

//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>Property Management</Typography>
//             <Button variant="contained" color="primary" onClick={() => {
//                 setFormData({
//                     title: '',
//                     description: '',
//                     price: '',
//                     creator: '',
//                     category: '',
//                     type: '',
//                     streetAddress: '',
//                     aptSuite: '',
//                     city: '',
//                     province: '',
//                     country: '',
//                     guestCount: '',
//                     bedroomCount: '',
//                     bedCount: '',
//                     bathroomCount: '',
//                     amenities: '',
//                     listingPhotoPaths: [],
//                     isBooked: false,
//                 });
//                 setEditingPropertyId(null);
//                 setOpen(true);
//             }}>
//                 Add Property
//             </Button>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Title</TableCell>
//                             <TableCell>Price</TableCell>
//                             <TableCell>Creator</TableCell>
//                             <TableCell>Booked</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {properties.map(property => (
//                             <TableRow key={property._id}>
//                                 <TableCell>{property.title}</TableCell>
//                                 <TableCell>{property.price}</TableCell>
//                                 <TableCell>{property.creator?.firstName} {property.creator?.lastName}</TableCell>
//                                 <TableCell>{property.isBooked ? 'Booked' : 'Available'}</TableCell>
//                                 <TableCell>
//                                     <Button variant="contained" color="primary" onClick={() => handleEditProperty(property)}>Edit</Button>
//                                     <Button variant="contained" color="secondary" onClick={() => handleDeleteProperty(property._id)} style={{ marginLeft: "10px" }}>Delete</Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* Edit/Add Property Dialog */}
//             <Dialog open={open} onClose={() => setOpen(false)}>
//                 <DialogTitle>{editingPropertyId ? "Edit Property" : "Add Property"}</DialogTitle>
//                 <DialogContent>
//                     <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} margin="dense" />
//                     <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} margin="dense" />
//                     <TextField fullWidth label="Price" name="price" type="number" value={formData.price} onChange={handleChange} margin="dense" />
//                     <TextField fullWidth label="Category" name="category" value={formData.category} onChange={handleChange} margin="dense" />
//                     <TextField fullWidth label="Type" name="type" value={formData.type} onChange={handleChange} margin="dense" />
//                     <TextField fullWidth label="Street Address" name="streetAddress" value={formData.streetAddress} onChange={handleChange} margin="dense" />
//                     <TextField fullWidth label="Apt/Suite" name="aptSuite" value={formData.aptSuite} onChange={handleChange} margin="dense" />
//                     <TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} margin="dense" />
//                     <TextField fullWidth label="Province" name="province" value={formData.province} onChange={handleChange} margin="dense" />
//                     <TextField fullWidth label="Country" name="country" value={formData.country} onChange={handleChange} margin="dense" />
//                     <TextField fullWidth label="Guest Count" name="guestCount" type="number" value={formData.guestCount} onChange={handleChange} margin="dense" />
//                     <TextField fullWidth label="Bedroom Count" name="bedroomCount" type="number" value={formData.bedroomCount} onChange={handleChange} margin="dense" />
//                     <TextField fullWidth label="Bed Count" name="bedCount" type="number" value={formData.bedCount} onChange={handleChange} margin="dense" />
//                     <TextField fullWidth label="Bathroom Count" name="bathroomCount" type="number" value={formData.bathroomCount} onChange={handleChange} margin="dense" />
//                     <TextField fullWidth label="Amenities (comma separated)" name="amenities" value={formData.amenities} onChange={handleChange} margin="dense" />
//                     <FormControlLabel
//                         control={<Checkbox checked={formData.isBooked} onChange={handleChange} name="isBooked" />}
//                         label="Is Booked"
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpen(false)}>Cancel</Button>
//                     <Button color="primary" variant="contained" onClick={handleSubmit}>
//                         {editingPropertyId ? "Save" : "Add"}
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Container>
//     );
// };

// export default PropertyManagement;


import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Button, Dialog, DialogActions, DialogContent,
    DialogTitle, TextField, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import axios from 'axios';

const PropertyManagement = () => {
    const [properties, setProperties] = useState([]);
    const [hosts, setHosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [formData, setFormData] = useState({
        title: '', description: '', price: '', creator: '',
        category: '', type: '', streetAddress: '', aptSuite: '',
        city: '', province: '', country: '', guestCount: '',
        bedroomCount: '', bedCount: '', bathroomCount: '',
        amenities: '', isBooked: false,
    });
    const [editingPropertyId, setEditingPropertyId] = useState(null);

    useEffect(() => {
        fetchProperties();
        fetchHosts(); // yo function le sabai user fetch gariraxa but asle garnu parne vaneko host matra ho
    }, []);

    const fetchProperties = async () => {
        const res = await axios.get('http://localhost:3001/properties');
        setProperties(res.data);
    };

    const fetchHosts = async () => {
        const res = await axios.get('http://localhost:3001/users');
        setHosts(res.data);
    };

    const handleEditProperty = (property) => {
        setFormData({
            title: property.title,
            description: property.description,
            price: property.price,
            creator: property.creator?._id || '',
            category: property.category,
            type: property.type,
            streetAddress: property.streetAddress,
            aptSuite: property.aptSuite,
            city: property.city,
            province: property.province,
            country: property.country,
            guestCount: property.guestCount,
            bedroomCount: property.bedroomCount,
            bedCount: property.bedCount,
            bathroomCount: property.bathroomCount,
            amenities: property.amenities.join(', '),
            isBooked: property.isBooked,
        });
        setSelectedFiles([]);
        setEditingPropertyId(property._id);
        setOpen(true);
    };

    const handleDeleteProperty = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            await axios.delete(`http://localhost:3001/properties/${id}`);
            fetchProperties();
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleFileChange = (e) => {
        setSelectedFiles(e.target.files);
    };

    const handleSubmit = async () => {
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "amenities") {
                data.append(key, value.split(',').map(a => a.trim()));
            } else {
                data.append(key, value);
            }
        });

        for (let file of selectedFiles) {
            data.append("listingPhotos", file);
        }

        try {
            if (editingPropertyId) {
                await axios.put(`http://localhost:3001/properties/${editingPropertyId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('http://localhost:3001/properties/create', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            setOpen(false);
            fetchProperties();
        } catch (err) {
            console.error("Error saving property:", err.response?.data || err.message);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Property Management</Typography>
            <Button variant="contained" onClick={() => {
                setFormData({
                    title: '', description: '', price: '', creator: '',
                    category: '', type: '', streetAddress: '', aptSuite: '',
                    city: '', province: '', country: '', guestCount: '',
                    bedroomCount: '', bedCount: '', bathroomCount: '',
                    amenities: '', isBooked: false,
                });
                setSelectedFiles([]);
                setEditingPropertyId(null);
                setOpen(true);
            }}>Add Property</Button>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Price(per day)</TableCell>
                            <TableCell>Creator</TableCell>
                            <TableCell>Booked</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {properties.map(p => (
                            <TableRow key={p._id}>
                                <TableCell>{p.title}</TableCell>
                                <TableCell>{p.price}</TableCell>
                                <TableCell>{p.creator?.firstName} {p.creator?.lastName}</TableCell>
                                <TableCell>{p.isBooked ? "Booked" : "Available"}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEditProperty(p)}>Edit</Button>
                                    <Button color="secondary" onClick={() => handleDeleteProperty(p._id)} style={{ marginLeft: "10px" }}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add/Edit Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>{editingPropertyId ? "Edit" : "Add"} Property</DialogTitle>
                <DialogContent>
                    <TextField fullWidth name="title" label="Title" value={formData.title} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="description" label="Description" value={formData.description} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="price" type="number" label="Price" value={formData.price} onChange={handleChange} margin="dense" />

                    <FormControl fullWidth margin="dense">
                        <InputLabel>Select Host</InputLabel>
                        <Select name="creator" value={formData.creator} onChange={handleChange}>
                            {hosts.map(host => (
                                <MenuItem key={host._id} value={host._id}>
                                    {host.firstName} {host.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField fullWidth name="category" label="Category" value={formData.category} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="type" label="Type" value={formData.type} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="streetAddress" label="Street Address" value={formData.streetAddress} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="aptSuite" label="Apt/Suite" value={formData.aptSuite} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="city" label="City" value={formData.city} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="province" label="Province" value={formData.province} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="country" label="Country" value={formData.country} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="guestCount" type="number" label="Guest Count" value={formData.guestCount} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="bedroomCount" type="number" label="Bedroom Count" value={formData.bedroomCount} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="bedCount" type="number" label="Bed Count" value={formData.bedCount} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="bathroomCount" type="number" label="Bathroom Count" value={formData.bathroomCount} onChange={handleChange} margin="dense" />
                    <TextField fullWidth name="amenities" label="Amenities (comma separated)" value={formData.amenities} onChange={handleChange} margin="dense" />
                    <FormControlLabel control={<Checkbox checked={formData.isBooked} onChange={handleChange} name="isBooked" />} label="Is Booked" />

                    <input type="file" multiple onChange={handleFileChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>{editingPropertyId ? "Save" : "Add"}</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default PropertyManagement;




