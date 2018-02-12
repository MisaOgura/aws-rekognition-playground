import request from 'axios'

export const detectText = (imageId) => {
  return request.get(`/api/rekognition?imageId=${imageId}`)
}
