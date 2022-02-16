import React, { Component } from "react";
import Routes from "./Routes";
import Navbar from "./Navbar";
import bitcoin from "./images/1.png";
import ethereum from "./images/2.png";
import other from "./images/3.png";
import './App.css';


class App extends Component {
  static defaultProps = {
    coins: [
      {
        name: "Bitcoin",
        age: 2009,
        src: bitcoin,
        facts: [
          "First decetralized digital currency.",
          "Created by Satoshi Nakamoto",
          "Uses Proof-of-work."
        ]
      },
      {
        name: "Ethereum",
        age: 2015,
        src: ethereum,
        facts: [
          "Second largest cryptocurrency by market capitalization.",
          "Created by Vitalik Buterin and others.",
          "Ethereum 2.0 is transitioning to a proof-of-stake consensus algorithm"
        ]
      },
      {
        name: "Others",
        age: 2011,
        src: other,
        facts: [
          "Other coins exist that are alternatives to Bitcoin (altcoins).",
          "Examples inlcude Litecoin and ZCash."
        ]
      }
    ]
  }
  render(){
    return (
      <div>
        <Navbar coins={this.props.coins} />
        <div className='container'>
          <Routes coins={this.props.coins} />
        </div>
     </div> 
    );
      
  }
  }
  

export default App;
