const express = require('express');
const router = express.Router();
const {
  register,
  login,
  validateRegister,
  handleValidationErrors,
} = require('../controllers/authController');

router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', login); // You can add validation here too if needed

module.exports = router;
