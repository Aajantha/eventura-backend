import express from 'express';
import { registerUser, loginUser, getAllUsers, deleteUser,editUser } from '../controllers/authController.js';
import { auth, verifyToken, admin } from '../middleware/authMiddleware.js';

const authRoutes = express.Router();

// Public route
authRoutes.get('/public', (req, res) => {
    res.send('This is a public route');
});

// User-only route
authRoutes.get('/user', auth, (req, res) => {
    res.send('This is a user route');
});

// Admin-only route
authRoutes.get('/admin', verifyToken, admin, (req, res) => {
    res.send('This is an admin route');
});

// Login route
authRoutes.post('/login', loginUser);

// Register route
authRoutes.post('/register', registerUser);

// Fetch all users (admin access only)
authRoutes.get('/users',verifyToken, admin, getAllUsers);

authRoutes.put('/users/:id', verifyToken, admin, editUser);


// Delete a user (admin access only)
authRoutes.delete('/users/:id', [auth, admin], deleteUser);

export default authRoutes;
