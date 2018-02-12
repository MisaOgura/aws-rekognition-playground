import { Router } from 'express'
import AWS from 'aws-sdk'

AWS.config.apiVersions = {rekognition: '2016-06-27'}

require('dotenv').config()

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const rekognition = new AWS.Rekognition()

const apiRouter = Router()

apiRouter.get('/rekognition', async (req, res) => {
  const params = {
    Image: {
      S3Object: {
        Bucket: process.env.AWS_S3_BUCKET,
        Name: req.query.imageId
      }
    }
  }

  rekognition.detectText(params, (err, data) => {
    if (err) console.log(err, err.stack)
    else res.status(200).send(data)
  })
})

export default apiRouter
