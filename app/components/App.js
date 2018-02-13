import React, { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import FormData from 'form-data'

import { postImage } from '../services/rekognitionClient'

class App extends Component {
  handleFileChange (e) {
    this.file = e.target.files[0]
  }

  async handleSubmit (e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', this.file)

    try {
      const res = await postImage(formData)
      console.log('Data came back from the backend //////')
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    return (
      <div className='hello-world'>
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
