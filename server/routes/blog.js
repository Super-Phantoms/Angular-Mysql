
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");

const {
  list,
  paginate,
  update,
  add,
  del,
  detail
} = require('../controllers/blog.js')

router.get    ( '/list/:year?/:month?/:day?',       list );
router.get    ( '/paginate/:page?/:limit?/:searchkey?/',       paginate );
router.get    ( '/detail/:id',                      detail);
router.post   ( '/', auth,                          add );
router.put    ( '/', auth,                          update );
router.delete ( '/:id', auth,                       del );

module.exports = router;
