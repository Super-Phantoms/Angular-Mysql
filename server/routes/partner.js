
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");

const {
  list,
  update,
  add,
  del,

} = require('../controllers/partner.js');

router.get    ( '/:from/:to',   list );
router.post   ( '/', auth,      add );
router.put    ( '/', auth,      update );
router.delete ( '/:id', auth,   del );

module.exports = router;
