
const express = require("express");
const router = express.Router();
const multer  = require('multer')
const auth = require("../middleware/auth.js");
const fs = require("fs");
const config = require('../config/db.config.js')
// const upload = multer({ dest: './public/data/uploads/' })
// Instead above code line...
// Configuration for Multer

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('ddddddddd');

    // balayAudPath = `../${config.CLIENT_ROOT}/src/video`
    balayAudPath = `public/video`

    fs.mkdirSync(balayAudPath, { recursive: true })

    cb(null, `public`);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `video/${file.fieldname}_${Date.now()}.${ext}`);
  },
});
// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "mp4") {
    cb(null, true);
  } else {
    cb(new Error("Not a MP4 File!!"), false);
  }
};
//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
  limits:{fieldSize: 50 * 1024 * 1024} 
  // fileFilter: multerFilter,
});

const {
  list,
  update,
  add,
  del,

  list_intro,
  update_intro,
} = require('../controllers/services');

router.get    ( '/content/:catId',      list );
router.post   ( '/content/', auth,      add );
router.put    ( '/content/', auth,      upload.single('intro_media'),          update );
router.delete ( '/content/:id', auth,   del );

router.get    ( '/intro/:catId',        list_intro );
router.put    ( '/intro/', auth,        update_intro );


module.exports = router;
