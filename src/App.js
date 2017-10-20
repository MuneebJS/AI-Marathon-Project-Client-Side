import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Files from 'react-files'
import FileBase64 from 'react-file-base64';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Signup from './containers/signup'
// import Signin from './containers/signin'

class App extends Component {
  constructor() {
    super();
    // this.getFiles = this.getFiles.bind(this)
    this.getFiles = this.getFiles.bind(this)
    // this.createCORSRequest = this.createCORSRequest.bind(this)
    this.state = {
      transcription: "Please Select File to get transcript",
      files: [],
      magnitude: "No Score to show",
      score: "No magnitude to show"
    }

  }
  // componentDidMount() {
  //   axios.get('http://localhost:3050')

  //     .then((data) => {
  //       // console.log(data) 
  //       const response = data.data;
  //       // console.log(response.data)
  //       this.setState({
  //         text: response
  //       })
  //     })
  // }



  // onFilesChange(files) {
  //   console.log(files[0])
  //   axios.post('http://localhost:3050/speechRec', {
  //     data: files[0]
  //   })
  //     .then(function (response) {
  //       console.log("success", response);
  //     })
  //     .catch(function (error) {
  //       console.log("error", error);
  //     });
  // }

  // onFilesError(file, error) {
  //   console.log('error code ' + error.code + ': ' + error.message)
  // }
  // postReq() {
  //   getFiles();
  // }

  getFiles(files) {
    this.setState({ files: files })
    let recievedData;
    // console.log("path ===>" + files[0].path, files[0])
    let data = files[0].base64;
    axios.post('http://localhost:3050/speechRec', {
      data: data
    })
      .then((response) => {
        console.log("success", response);
        // if (response.statusText == "OK") {
        //   // console.log(this.state)
        //   // console.log('if')
        // }
        // else {
          // console.log("else run")
        // }
        // this.setState()
        // recievedData = 
        this.setState({
          transcription: response.data.transcript,
          score: response.data.score,
          magnitude: response.data.magnitude
        })

      })
      .catch((error) => {
        console.log("error", error);
      });
    // console.log("recievedData", recievedData);

  }


  render() {
    return (
      <div>
        <div>
          {this.state.text}
        </div>
        <div className="files">
          {/* <Files
            className='files-dropzone'
            onChange={this.onFilesChange}
            onError={this.onFilesError}
            accepts={['image/png', 'text/plain', 'audio/*']}
            multiple
            maxFiles={3}
            maxFileSize={10000000}
            minFileSize={0}
            clickable
          >
            Drop files here or click to upload */}
          <FileBase64
            multiple={true}
            onDone={this.getFiles.bind(this)} />
          {/* </Files> */}
        </div>
        <div>
          <h1>
            Transcript :
              {this.state.transcription}
          </h1>
          <h1>
            Score :
              {this.state.score}
          </h1>
          <h1>
            Magnitude :
              {this.state.magnitude}
          </h1>
        </div>
      </div>
    )
  }
}

export default App;
