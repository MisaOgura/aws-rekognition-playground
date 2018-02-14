import fs from 'fs'
import AWS from 'aws-sdk'
import { Router } from 'express'
// import cv from 'opencv'

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

// let processedFilePath, processedFileName

apiRouter.post('/images', async (req, res) => {
  const imageData = req.files.file
  const filePath = imageData.file
  const fileName = imageData.filename

  // cv.readImage(filePath, (err, img) => {
  //   if (err) throw err
  //   const width = img.width()
  //   const height = img.height()
  //   if (width < 1 || height < 1) throw new Error('Image has no size')
  //
  //   // do some cool stuff with img
  //   // img.detectObject(cv.CAR_SIDE_CASCADE, {}, (err, objects) => {
  //   //   if (err) throw err
  //   //
  //   //   console.log('Objects: ', objects)
  //   //
  //   //   objects.map(obj =>
  //   //     img.ellipse(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, obj.height / 2, [255, 255, 0], 3)
  //   //   )
  //   //
  //   //   img.save(`./public/images/processed_detectObject_${fileName}`)
  //   //   console.log('Image saved.')
  //   // })
  //
  //   img.convertGrayscale()
  //   img.gaussianBlur([3, 3])
  //
  //   const lowThresh = 200
  //   const highThresh = 400
  //
  //   img.canny(lowThresh, highThresh)
  //
  //   // save img
  //   console.log('Processing...')
  //   processedFileName = `grayscale_canny-${lowThresh}-${highThresh}_${fileName}`
  //   processedFilePath = `./public/images/${processedFileName}`
  //   img.save(processedFilePath)
  //   console.log(`Processed image saved in ${processedFilePath}`)
  // })

  const imageBinary = fs.readFileSync(filePath)

  try {
    const params = {
      Body: imageBinary,
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName
    }
    await s3.putObject(params).promise()

    const options = {
      Image: {
        S3Object: {
          Bucket: process.env.AWS_S3_BUCKET,
          Name: fileName
        }
      }
    }
    const {TextDetections} = await rekognition.detectText(options).promise()
    res.status(200).send(TextDetections)
  } catch (err) {
    console.error(err, err.stack)
  }
})

export default apiRouter
