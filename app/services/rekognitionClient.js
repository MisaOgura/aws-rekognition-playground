import request from 'axios'

const detectText = (imageId) => {
  return request.get(`/api/rekognition?imageId=${imageId}`)
}

export default detectText
