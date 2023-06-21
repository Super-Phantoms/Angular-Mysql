
const express = require("express");
const router = express.Router();
const multer  = require('multer')
const auth = require("../middleware/auth");
const config = require('../config/db.config')

// const upload = multer({ dest: './public/data/uploads/' })
// Instead above code line...
// Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('eeeeeeeeeee');

    // balayAudPath = `../${config.CLIENT_ROOT}/src/video`
    balayAudPath = `public/files`

    fs.mkdirSync(balayAudPath, { recursive: true })

    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
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

// router.post('/upload', upload.single('intro_media'), function (req, res) {
//   // req.file is the name of your file in the form above, here 'uploaded_file'
//   // req.body will hold the text fields, if there were any 
//   console.log('@#$@#$@#$@#$@#$@$@#$')
//   console.log(req.file, req.body)
// });

const {
  list,
  update,
  add,
  del,
} = require('../controllers/teams');

router.get    ( '/',            list );
router.post   ( '/', auth,      add );
router.put    ( '/', auth,      update );
router.delete ( '/:id', auth,   del );

// router.put   ( '/upload', upload.single('intro_media'), update);


module.exports = router;
