// middleware/auth.js
const jwt = require('jsonwebtoken');

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log('Token received:', token);
  if (!token) {
    return sendErrorResponse(res, 401, 'Access denied. No token provided.');
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'default-secret-key';
    
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    if (decoded.user) {
      // For regular users
      req.user = decoded.user;
      next();
    } else if (decoded.dietitian) {
      // For dietitians
      req.userId = decoded.dietitian.id;
      next();
    } else {
      return sendErrorResponse(res, 401, 'Invalid token format.');
    }
  }  catch (error) {
    console.error('Error decoding token:', error.message);
    return sendErrorResponse(res, 401, 'Invalid token.');
  }
};
