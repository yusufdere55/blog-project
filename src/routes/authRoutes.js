const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validations/userValidations');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', getMe);

module.exports = router; 