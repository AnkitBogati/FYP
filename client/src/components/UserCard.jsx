// UserCard.jsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const UserCard = ({ user, onEdit, onDelete }) => {
    return (
        <Card style={{ display: 'flex', marginBottom: '20px' }}>
            <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={user.profileImagePath || '/path/to/default/image.jpg'} // Default image if none
                alt={`${user.firstName} ${user.lastName}`}
            />
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardContent>
                    <Typography variant="h5">{user.firstName} {user.lastName}</Typography>
                    <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                    <Typography variant="body2" color="text.secondary">Role: {user.role}</Typography>
                </CardContent>
                <div style={{ padding: '16px' }}>
                    <Button variant="contained" color="primary" onClick={() => onEdit(user)}>Edit</Button>
                    <Button variant="contained" color="secondary" onClick={() => onDelete(user._id)} style={{ marginLeft: '10px' }}>Delete</Button>
                </div>
            </div>
        </Card>
    );
};

export default UserCard;