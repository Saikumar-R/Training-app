const express = require('express');

const { body } = require('express-validator');

const userDataController = require('../controllers/userData');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/',auth, userDataController.fetchAll);

module.exports = router;