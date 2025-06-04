// backend/middleware/logger.js
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next(); // Pass control to the next middleware/route handler
  };
  
  module.exports = logger;
  