import express from 'express';
import multer from 'multer'
import fs from 'fs'
const router = express.Router()
const upload = multer()

router.post('/upload', upload.single('file'), (req, res, next) => {
  const { file } = req
  const fileToString = file.buffer.toString()
  const fileToJSON = []
  const fileToArray = fileToString.split('\n')
  const header = fileToArray[0].split(',')
  const onlyDigits = new RegExp('^\\d+$')
  for(let i = 1; i < fileToArray.length; i++) {
    let newEntry = {}
    let arrSingleEntry = fileToArray[i].split(',')
    for(let j = 0; j < header.length; j++) {
      let value = arrSingleEntry[j].replace('\r','')
      newEntry[header[j]] = onlyDigits.test(value) ? Number(value) : value
    }
    fileToJSON.push(newEntry)
  }
  console.log(fileToJSON)
  res.json(fileToJSON)
})

export default router
