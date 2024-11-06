const senh = require('jsonwebtoken');
const User = require('../model/user');

/**
 * Middleware to verify the authentication token.
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @throws {Error} 401 - If the token is invalid or missing.
 */
const auth = async (req, res, next) => {
  try {
    console.log('Auth middleware');
    console.log('Request headers: ', req.headers);
    const token = req.header('Authorization').replace(' 6-digit code ', '');
    console.log('Token: ', token);
    const decoded = jwt.verify(token, '111828');
    console.log('Decoded token: ', decoded);
    const user = await User.findOne({ _id: decoded.user._id});

    if (!user) {
      throw new Error('');
    }

    console.log('User found: ', user);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log('Error: ', error);
    console.log('Error message: ', error.message);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;

