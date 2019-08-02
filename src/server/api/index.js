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
  const onlyDigits = new RegExp('^[-+]?[0-9]*\.?[0-9]+$')
  for(let i = 1; i < fileToArray.length; i++) {
    let newEntry = {}
    let arrSingleEntry = fileToArray[i].split(',')
    for(let j = 0; j < header.length; j++) {

      let value = arrSingleEntry[j] ? arrSingleEntry[j].replace('\r','') : null
      if(header[j] === 'date') {
        const [month, year] = value.split('/')
        newEntry[header[j]] = new Date(year, month - 1 )
      } else{
        newEntry[header[j]] = onlyDigits.test(value) ? Number(value) : value

      }
    }
    fileToJSON.push(newEntry)
  }
  res.json(fileToJSON)
})

export default router
