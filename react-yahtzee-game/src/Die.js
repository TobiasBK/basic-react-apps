import React, { Component } from "react";
import "./Die.css";

class Die extends Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.handleClick(this.props.idx);
  }

  render() {
    return (
      <button
        className={"Die"}
        style={{ backgroundColor: this.props.locked ? "grey" : "black" }}
        onClick = {this.handleClick} //{ () => this.props.handleClick(this.props.idx) } //add idx so it gets passed so added arrow fx (but to avoide arr fx in render, made a new handleClick fx)
      >
        {this.props.val}
      </button>
    );
  }
}

export default Die;
