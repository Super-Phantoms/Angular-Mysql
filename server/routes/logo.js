
const express = require("express");
const router = express.Router();
const multer  = require('multer')
const auth = require("../middleware/auth.js");
const fs = require("fs");

const multerStorage_logo = multer.diskStorage({
  destination: (req, file, cb) => {
    balayAudPath = 'public/assets/images'
    fs.mkdirSync(balayAudPath, { recursive: true })

    cb(null, 'public/assets');
  },
  filename: (req, file, cb) => {
    console.log('xxxxxxxxxx');
    console.log(file)

    // const ext = file.mimetype.split("/")[1]; //I don't use this now, but it will definitely come in handy in the future.
    
    if(file.fieldname == 'logo_image1') {
      cb(null, `images/ics-logo.png`);
    } else if( file.fieldname == 'logo_image2' ) {
      cb(null, `images/ics-logo1.png`);
    } else if( file.fieldname == 'logo_image3' ) {
      cb(null, `images/ctl-engineering-logo.png`);
    }
  },
});

//Calling the "multer" Function
const upload_logo = multer({
  storage: multerStorage_logo,
  // fileFilter: multerFilter,
});

router.put( '/', auth, upload_logo.any(), (req, res) => {
    res.send({
        success: 'true',
        msg: 'Update Successful'
    })
});


module.exports = router;
