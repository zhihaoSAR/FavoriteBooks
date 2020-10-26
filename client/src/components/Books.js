import { bool } from 'prop-types'
import React, { Component } from 'react'
import Detail from './Detail'
const URL = 'ws://localhost:3030'

class Books extends Component {
  state = {
    books: [],
    seen: false,
    book:{id:-1 ,title: "", description: ""},
    readOnly: false
  }

  ws = new WebSocket(URL)
  
  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      console.log(evt)
      const message = JSON.parse(evt.data)
      console.log("recibido informacion")
      console.log(message)
      //comprobar si es un libro o una colección de libro
      if((message.id == undefined))
      {
          console.log("hola")
        this.setState(({books: message}))
      }
      else{
          
          this.setState(state => {
            state.books[message.id] = message
            return ({books:state.books})
          })
      }
      console.log(this.state.books)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
    
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
    
    if(this.state.seen)
    {
        this.ws.send(JSON.stringify({method:"getBook",id:this.state.book.id}))
    }
    this.setState({
     seen: !this.state.seen
    });
    
   };
   
   //funciones para editar el libro
   editBook =() =>
   {
       let book = this.state.book
       this.ws.send(JSON.stringify({method:"editBook",id:book.id,title:book.title,description:book.description}))
   }
   popUp(id,readOnly)
   {
    this.state.book = this.state.books[id]
    this.setState({readOnly: readOnly})
    this.togglePop()
   }
   
   editTitle = (title) =>{
       this.setState(state =>
        {
            state.book.title = title.target.value
            return {book : state.book}
        } ,this.editBook)
       
   }
   editDescription = (description) =>
   {
    this.setState(state =>
        {
            state.book.description = description.target.value
            return {book : state.book}
        } ,this.editBook)
   }
   
  render() {

    const items = []

    for (let book of this.state.books) {
        items.push(<li className="booklist" key={items}><button className="book" onClick={()=>{return this.popUp(book.id,true)}}>{book.title}</button> 
                    <button onClick={()=>{return this.popUp(book.id,false)}}>edit</button> </li> )
    }
    return (
        
        <div>
            <div className="btn"  >
            {items}
            </div>
            {this.state.seen ? <Detail toggle={this.togglePop} book={this.state.book} readOnly={this.state.readOnly} 
                                editTitle={this.editTitle} editDescription={this.editDescription} /> : null}
       </div>
    )
  }
}

export default Books