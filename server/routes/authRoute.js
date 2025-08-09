// const express = require('express');
// const router = express.Router();
// const {
//   register,
//   login,
//   validateRegister,
//   handleValidationErrors,
// } = require('../controllers/authController');

// router.post('/register', validateRegister, handleValidationErrors, register);
// router.post('/login', login); // You can add validation here too if needed

// module.exports = router;


// routes/authRoute.js
const express = require('express');
const router = express.Router();
const { register, login, validateRegister, handleValidationErrors } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');


router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', login);
router.get('/me', protect, (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    role: req.user.role,
  });
});

module.exports = router;
