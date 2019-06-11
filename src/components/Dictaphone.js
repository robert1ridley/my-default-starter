import React, {Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

class Dictaphone extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hello: '',
        start: false,
        stop: false,
        input: '...',
        ouput: '...',
      };
    }

    componentDidMount(){
      this.recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition)();
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        console.log('Speech has been detected.');
      };

      this.recognition.onresult = (e) => {
        console.log('Result has been detected.');
        const last = e.results.length - 1;
        const text = e.results[0][0].transcript;

        this.setState({ input: text });
        console.log(`Confidence: ${e.results[0][0].confidence}`);
      };
      this.recognition.onend = () => {
        this.recognition.stop();
      }

      this.recognition.onerror = e => {
        this.setState({ output: e.error });
      };
    }

  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <div>
      <button
          onClick={() => {
            this.recognition.start();
          }}
      >button</button>
      </div>
    )
  }
}

export default SpeechRecognition(Dictaphone)