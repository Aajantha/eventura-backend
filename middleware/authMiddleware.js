import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Make sure to import User model correctly

export const auth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next(); // Return to prevent executing the rest of the code
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from header
  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode token
    req.user = decoded; // Attach decoded token payload to req
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

// Middleware to check for admin role
export const admin = (req, res, next) => {
  console.log("User Object:", req.user); // Log for debugging

  // Adjusted check for req.user.user.role
  if (req.user && req.user.user && req.user.user.role === 'admin') {
    return next(); // If admin, proceed to the next middleware or route handler
  } else {
    return res.status(403).json({ message: 'Not authorized as admin' });
  }
};


