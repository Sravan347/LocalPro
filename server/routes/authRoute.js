
const express = require('express');
const router = express.Router();
const { register, login, validateRegister, handleValidationErrors ,logout} = require('../controllers/authController');
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
router.post("/logout",protect, logout);


module.exports = router;
