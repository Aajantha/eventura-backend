import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register a new user

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Check for missing fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    user = new User({
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the user to the database
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // Log the complete error for debugging
    console.error('Error in registerUser:', err); // More detailed error logging
    res.status(500).json({ message: 'Server error', error: err.message }); // Send error details in response
  }
};


// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the user exists
    let user = await User.findOne({ email });
    console.log("User found:", user); // Log the user object

    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Log the password values before comparing
    console.log("Plain password:", password);
    console.log("Hashed password:", user.password);

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch); // Log the result of the password comparison

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Log JWT_SECRET value
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    // Create and sign the JWT token
    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, role: user.role });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users); // Return all users in JSON format
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Delete a user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.json({ message: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Edit User Controller (admin only)
export const editUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find the user by ID

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields from the request body (only the fields passed will be updated)
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save(); // Save the updated user

    res.json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
