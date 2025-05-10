import Navbar from '../components/Navbar'
import Listings from '../components/Listings';
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 

const HostDashboard = () => {

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();  

  const [properties, setProperties] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '',
    category: '', type: '', streetAddress: '', aptSuite: '',
    city: '', province: '', country: '', guestCount: '',
    bedroomCount: '', bedCount: '', bathroomCount: '',
    amenities: '', isBooked: false,
  });
  const [editingPropertyId, setEditingPropertyId] = useState(null);

  // useEffect(() => {
  //   fetchProperties();
  //   // fetchHosts();
  // }, [])


  useEffect(() => {
    if (user?._id) fetchProperties();
  }, [user]);


  // const fetchProperties = async () => {
  //   const res = await axios.get(`http://localhost:3001/properties`);
  //   setProperties(res.data);
  // };

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/properties/host/${user._id}`);
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching host properties:", err);
    }
  };

  // const fetchProperties = async (hostId) => {
  //   try {
  //     const res = await axios.get(`http://localhost:3001/properties/host/${user._id}`);
  //     setProperties(res.data);
  //   } catch (error) {
  //     console.error("Error fetching host properties:", error);
  // }


  const handleEditProperty = (property) => {
    setFormData({
      title: property.title,
      description: property.description,
      price: property.price,
      // creator: property.creator?._id || '',
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
    <>
      <Navbar />

      <Container>
        <Typography variant="h4" gutterBottom>Property Management</Typography>
        <Button variant="contained" onClick={() => navigate("/create-listing")}

          // setFormData({
          //   title: '', description: '', price: '',
          //   category: '', type: '', streetAddress: '', aptSuite: '',
          //   city: '', province: '', country: '', guestCount: '',
          //   bedroomCount: '', bedCount: '', bathroomCount: '',
          //   amenities: '', isBooked: false,
          // });
          // setSelectedFiles([]);
          // setEditingPropertyId(null);
          // setOpen(true);
        >Add Property</Button>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Price(per day)</TableCell>
                <TableCell>Booked</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {properties.map(p => (
                <TableRow key={p._id}>
                  <TableCell>{p.title}</TableCell>
                  <TableCell>{p.price}</TableCell>
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

      <Listings />
    </>
  )
}


export default HostDashboard;

