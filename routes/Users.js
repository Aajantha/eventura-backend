// // routes/Users.js
// import express from 'express';
// import User from '../models/User.js'; // Import the User model
// import { getAllUsers, deleteUser } from '../controllers/authController.js'; 
// import { auth, admin } from '../middleware/authMiddleware.js'; 

// const router = express.Router();

// // Route to fetch all users (admin access only)
// router.get('/', getAllUsers);

// // Route to get a user by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Route to delete a user (admin access only)
// router.delete('/:id', [auth, admin], deleteUser);

// // Route to edit a user
// router.patch('/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (req.body.name != null) user.name = req.body.name;
//     if (req.body.email != null) user.email = req.body.email;
//     if (req.body.role != null) user.role = req.body.role;

//     const updatedUser = await user.save();
//     res.json(updatedUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// export default router;
