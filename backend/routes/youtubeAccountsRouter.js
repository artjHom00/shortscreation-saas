let router = require('express').Router()
let {
  addYoutubeAccount,
  getYoutubeAccounts,
  getUsersYoutubeAccounts,
  updateYoutubeAccount,
  deleteYoutubeAccount
} = require('../controllers/youtubeAccountsController')
let {
  authenticateToken
} = require('../providers/jwt')
let multer = require('multer')
let crypto = require('crypto')
let mime = require('mime')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(6, function (err, raw) {
      cb(null, raw.toString('hex') + '.' + mime.extension(file.mimetype));
    });
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 314572800 // 300mb
  },
  fileFilter: (req, file, cb) => {
    // Check if the file extension is '.mp4'
    if (file.originalname.match(/\.mp4$/)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Only .mp4 files are allowed.'), false); // Reject the file
    }
  }
})

router.post('/', authenticateToken, addYoutubeAccount)

// router.get('/', authenticateToken, getYoutubeAccounts)
router.get('/', authenticateToken, getUsersYoutubeAccounts)

router.delete('/:id', authenticateToken, deleteYoutubeAccount)
router.patch('/:id', [authenticateToken, upload.single('background_video')], updateYoutubeAccount)


module.exports = router