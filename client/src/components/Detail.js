import React, { Component } from "react";
 class Detail extends Component {


  handleClick = () => {
   this.props.toggle();
  };
render() {
  return (
    <div className="modal">
    <div className="modal_content">
      <span className="close" onClick={this.handleClick}>
        &times;
      </span>
      
      <form>
      <div className='detail'>
        <input
        type="textarea"
        defaultValue={this.props.book.title}
        onChange={this.props.edit}
        />
        </div>
        <div className="detail">
        <textarea className="description"
        type="textarea"
        defaultValue={this.props.book.description}
        onChange={this.props.edit}
        
        />
        </div>
      </form>
      
    </div>
  </div>
  );
 }
}
export default Detail
