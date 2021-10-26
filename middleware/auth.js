//middleware is just function that has access to req res object cycle. everytime we hit an endpoint, we can fire off middleware. 
const jwt = require('jsonwebtoken');
const config = require('config');




module.exports = function(req, res, next) {
  // Get the token from the header
  const token = req.header('x-auth-token');

  // Check if no token
  if(!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // If there IS  a token then we need to verify it
  try {
    // pull out payload
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // Set that user inside the payload to req.user
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}