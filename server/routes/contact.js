
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");

const {
  list,
  update,
} = require('../controllers/contacts.js');

router.get    ( '/',            list );
router.put    ( '/', auth,      update );

module.exports = router;
