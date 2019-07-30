import express from 'express';
import multer from 'multer'
import fs from 'fs'
const router = express.Router()
const upload = multer()

router.post('/upload', upload.single('file'), (req, res, next) => {
  const { file } = req
  console.log(file)
  const fileToString = file.buffer.toString()
  console.log(fileToString)
  res.send('done')
})

export default router
