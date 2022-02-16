import React, { Component } from "react";
import "./Die.css"

class Die extends Component{
    render(){
        return(  
            <div className="dice animated">
                <i className={`Die fas fa-dice-${this.props.face} ${this.props.rolling &&
              "shaking"}`} ></i>
            </div>
        
        )
    }
}

export default Die;