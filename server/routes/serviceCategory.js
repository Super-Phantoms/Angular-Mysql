
const express = require("express");
const router = express.Router();

const {
  list,
  relpost,
} = require('../controllers/serviceCategory');

router.get    ( '/:selFields?',      list );
router.get    ( '/relpost/:types',   relpost );


module.exports = router;
