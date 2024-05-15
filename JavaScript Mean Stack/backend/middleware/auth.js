const jwt = require('jsonwebtoken');
const User = require('../model/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'rosaleneomelhor');
    const user = await User.findOne({ _id: decoded.user._id});

    if (!user) {
      throw new Error('');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
