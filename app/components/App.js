import React, { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

import { detectText } from '../services/rekognitionClient'

class App extends Component {
  async handleClick (e) {
    const imageId = e.target.id

    try {
      const data = await detectText(imageId)
      console.log('Data came back from the backend //////')
      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }

  handleFileChange (e) {
    console.log('File change //////')
    this.file = e.target.files[0]
  }

  async handleSubmit (e) {
    e.preventDefault()
    console.log('Submitted //////')
    console.log(this.file)
    // TODO - upload file to S3
  }

  render () {
    return (
      <div className='hello-world'>
        <Button bsStyle='success' onClick={(e) => this.handleClick(e)} id={'bus_8.jpg'}>
          Play around with AWS Rekognition!
        </Button>

        <form>
          <FieldGroup
            id='formControlsFile'
            type='file'
            label='File'
            help='Example block-level help text here.'
            onChange={(e) => this.handleFileChange(e)}
          />
          <Button type='submit' bsStyle='warning' onClick={(e) => this.handleSubmit(e)}>Submit</Button>
        </form>
      </div>
    )
  }
}

function FieldGroup ({id, label, help, ...props}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

export default App
