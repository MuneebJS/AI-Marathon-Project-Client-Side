import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Files from 'react-files'
import FileBase64 from 'react-file-base64';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Signup from './containers/signup'
// import Signin from './containers/signin'

class Main extends Component {
  constructor() {
    super();
    this.getFiles = this.getFiles.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sentimentAnalyse = this.sentimentAnalyse.bind(this);
    // this.createCORSRequest = this.createCORSRequest.bind(this)
    this.state = {
      transcription: "No transcription to show please slelect file...",
      files: [],
      magnitude: "No Score to show",
      score: "No magnitude to show",
      sentiment: '',
      sentiment2: ''
    }
  }

  sentimentAnalyse() {
    axios.post('http://localhost:3050/sentiment', {
      data: {
        text: this.state.transcription
        // text: "what the hell is this"
      }
    })
      .then((response) => {
        // this.refs.input = "";
        this.setState({
          value: ""
        })
        console.log("sentiment response", response);
        let feedback;
        feedback = `Score is ${response.data.score} and magnitude is ${response.data.magnitude}`
        this.setState({
          sentiment2: feedback
        })
      })
      .catch((error) => {
        console.log("error", error);
      });
  }


  getFiles(files) {
    this.setState({ files: files })
    let recievedData;
    // console.log("path ===>" + files[0].path, files[0])
    let data = files[0].base64;
    data = data.split(',');
    let base64String = data[1]

    // console.log(base64String)

    axios.post('http://localhost:3050/speechRec', {
      data: base64String
    })
      .then((response) => {
        console.log("success", response);
        this.setState({
          transcription: response.data.transcription,
        })

      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    // console.log(this.state.value)
  }

  handleSubmit(event) {
    this.sentimentAnalyse(this.state.value)

    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    axios.post('http://localhost:3050/sentiment', {
      data: {
        text: this.state.value
      }
    })
      .then((response) => {
        // this.refs.input = "";
        this.setState({
          value: ""
        })
        console.log("sentiment response", response);
        let feedback;
        feedback = `Score is ${response.data.score} and magnitude is ${response.data.magnitude}`
        this.setState({
          sentiment: feedback
        })
      })
      .catch((error) => {
        console.log("error", error);
      });
  }


  render() {
    return (
      <div style={{
        padding: "40px 130px",
      }}>
        <div>
          {this.state.text}
        </div>
        <div className="files">
          <FileBase64
            multiple={true}
            onDone={this.getFiles.bind(this)} 
              style={{
                    padding: "10px",
                    background: "#63D6E5",
                    color: "#fff",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    fontWeight: "bold",
               }}
            />
        </div>

        <div>
          <Card>
            <CardHeader
              title="Transcription"
              subtitle={this.state.sentiment2}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText style={{
              fontWeight: "bold"
            }}>

              {this.state.transcription}
            </CardText>
            <CardActions>
              <FlatButton label="Analyze"
                onClick={this.sentimentAnalyse}
              />

            </CardActions>

          </Card>

        </div>
        <br />
        <br />
        <div>
          <TextField
            hintText="Write text to analyze"
            onChange={this.handleChange}

          /><br />
          <br />
          {/* <input type="text" onChange={this.handleChange} /> */}
          <RaisedButton label="Submit" primary={true}
            onClick={this.handleSubmit}
          />
        </div>
        <div style={{
          marginTop: 10,
          fontWeight: 'bold'
        }}>
          {this.state.sentiment}
        </div>
      </div>
    )
  }
}

export default Main;
