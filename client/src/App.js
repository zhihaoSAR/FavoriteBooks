import React, { Component } from 'react'
import './App.css'
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