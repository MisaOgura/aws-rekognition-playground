import React from 'react'
import { Button } from 'react-bootstrap'

import detectText from '../services/rekognitionClient'

function App () {
  return (
    <div className='hello-world'>
      <Button bsStyle='success' onClick={handleClick} id={'bus_8.jpg'}>
        Play around with AWS Rekognition
      </Button>
    </div>
  )

  async function handleClick (e) {
    const imageId = e.target.id
    const data = await detectText(imageId)
    console.log('Data came back from the backend //////')
    console.log(data)
  }
}

export default App
