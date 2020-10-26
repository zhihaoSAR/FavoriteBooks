import React, { Component } from 'react'
import Detail from './Detail'
const URL = 'ws://localhost:3030'

class Books extends Component {
  state = {
    books: [],
    seen: false
  }

  ws = new WebSocket(URL)
  
  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      this.addMessage(message)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
    //this.ws.send(JSON.stringify({method: "getBooks"}))
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: this.state.name, message: messageString }
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  
  handleClick(event) {
    const modal = document.querySelector(".modal")
    const closeBtn = document.querySelector(".close")
    modal.style.display = "block";
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    })
  }
  togglePop = () => {
    this.setState({
     seen: !this.state.seen
    });
   };
  

  render() {
    return (
        
        <div>
            <div className="btn" onClick={this.togglePop}>
            <button>New User?</button>
            </div>
            {this.state.seen ? <Detail toggle={this.togglePop} /> : null}
       </div>
    )
  }
}

export default Books