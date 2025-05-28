const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApprovedEmail = require('../models/approvedEmail');

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // token exists in Authorization header ??
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized!'
      });
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // set user in req object
      req.user = await User.findById(decoded.id);
      
      if (!req.user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }
  } catch (error) {
    next(error);
  }
};

// Authorize specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized`
      });
    }
    
    next();
  };
};

// Check if email is approved
exports.checkApprovedEmail = async (email, role) => {
  try {
    

    const emailValue = typeof email === 'object' && email.email ? email.email : email;
    
    const approvedEmail = await ApprovedEmail.findOne({
      email: emailValue,
      role,
      isActive: true
    });
    
    
    
    return !!approvedEmail;
  } catch (error) {
    console.error('Error checking approved email:', error);
    return false;
  }
};