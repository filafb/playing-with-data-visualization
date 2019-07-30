import express from 'express';
import multer from 'multer'
const router = express.Router()
const upload = multer()

router.post('/upload', upload.single('file'), (req, res, next) => {
  const { file } = req
  console.log(file)
  res.send('done')
})

export default router
