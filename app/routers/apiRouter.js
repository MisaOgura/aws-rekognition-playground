import fs from 'fs'
import AWS from 'aws-sdk'
import { Router } from 'express'

require('dotenv').config()

AWS.config.apiVersions = {rekognition: '2016-06-27'}
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const rekognition = new AWS.Rekognition()
const s3 = new AWS.S3()

const apiRouter = Router()

apiRouter.post('/images', (req, res) => {
  const imageData = req.files.file
  const imageFile = fs.readFileSync(imageData.file)

  const params = {
    Body: imageFile,
    Bucket: process.env.AWS_S3_BUCKET,
    Key: imageData.filename
  }

  console.log(params)

  s3.putObject(params).promise()
    .then(data => {
      console.log(data)
      const params = {
        Image: {
          S3Object: {
            Bucket: process.env.AWS_S3_BUCKET,
            Name: imageData.filename
          }
        }
      }

      rekognition.detectText(params).promise()
        .then(data => res.status(200).send(data))
        .catch(err => console.error(err, err.stack))
    }).catch(err => console.error(err, err.stack))
})

export default apiRouter
