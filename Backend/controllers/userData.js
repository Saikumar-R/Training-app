const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allUsers] = await User.fetchAll();
    res.status(200).json(allUsers);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// console.log('hello');