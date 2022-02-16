import React, { Component } from "react";
//import { Navbar } from "reactstrap";
import { NavLink } from "react-router-dom"; //NavLink gives active class when the active link

class Navbar extends Component{
    render(){
        const coinLinks = this.props.coins.map(coin => (
            <li className='nav-item' key={coin.name}>
            <NavLink exact to={`/coins/${coin.name}`} className='nav-link' >
                {coin.name}
            </NavLink>
        </li>
        ));
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">
                    Coin App
                </a>
                <button 
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    aria-controls='navbarNav'
                    aria-expanded="false"
                    aria-label="Toggle navigation "
                >
                    <span  className='navbar-toggler-icon'/>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink exact to="/coins" className='nav-link'>
                                Home
                            </NavLink>
                        </li>
                        {coinLinks}
                    </ul>
                </div>  
            </nav>
        )
    }
}


export default Navbar;