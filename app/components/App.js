import React, { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'
import FormData from 'form-data'

import { postImage } from '../services/rekognitionClient'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      file: null,
      data: null,
      error: null,
      imagePreviewUrl: null,
      processing: false
    }
  }

  handleFileChange (e) {
    e.preventDefault()
    const reader = new window.FileReader()

    const file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result
      })
    }
    reader.readAsDataURL(file)
  }

  async handleSubmit (e) {
    e.preventDefault()
    this.setState({processing: true})

    const formData = new FormData()
    formData.append('file', this.state.file)

    try {
      const res = await postImage(formData)
      this.setState({processing: false, data: res.data})
    } catch (e) {
      this.setState({processing: false, error: e})
      console.error(e)
    }
  }

  displayImageProcessingState () {
    if (!this.state.processing && this.state.data) {
      return <div>
        <h3>Texts detected! :-D</h3>
        {this.displayDetectedTexts()}
      </div>
    } else if (!this.state.processing && this.state.error) {
      return <h3>Error detecting texts... :-(</h3>
    } else if (this.state.processing) {
      return <h3>Processing the image...</h3>
    } else return null
  }

  displayDetectedTexts () {
    return this.state.data.map((data, i) => {
      return <p key={`data-${i + 1}`}>{`${i + 1}: "${data.DetectedText}" - Confidence: ${Math.round(data.Confidence)}%`}</p>
    })
  }

  renderUploadedImage () {
    if (this.state.imagePreviewUrl) {
      return <img
        className='uploadedImage'
        id={this.state.file.name}
        src={this.state.imagePreviewUrl} />
    }

    return null
  }

  render () {
    return (
      <div className='hello-world'>
        <h3>Upload an image of a London bus!</h3>
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

        {this.displayImageProcessingState()}
        {this.renderUploadedImage()}
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
