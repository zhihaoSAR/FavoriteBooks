import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Chat from './components/Chat'
import Books from './components/Books'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <Books />
        </header>
      </div>
    )
  }
}

export default App