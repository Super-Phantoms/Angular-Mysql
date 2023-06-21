
const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const {login, register, updtPass, chk_token} = require('../controllers/auth');

router.post('/login', login);
router.post('/register', register);
router.post('/updtPass', auth, updtPass);
router.get('/chk_token', chk_token);

module.exports = router;