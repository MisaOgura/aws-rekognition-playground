import request from 'axios'

export const postImage = (data) => {
  const config = {headers: { 'content-type': 'multipart/form-data' }}
  return request.post('/api/images', data, config)
}
