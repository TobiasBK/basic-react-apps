import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CoinList.css";

class CoinList extends Component{
    render(){
        return(
            <div className="CoinList">
                {/* //use bootstrap grid system to make a variable display on page */}
                <h1 className="display-1 text-center">Coin List</h1>
                <div className="container">
                    <div className="row">
                        {this.props.coins.map(c => (
                            <div className="Coin col-lg-4 text-center" key={c.name}>
                                <img src={c.src} alt={c.name}/>
                                <h3 className='mt-3'>
                                    <Link className='underline' to={`/coins/${c.name}`}>
                                    {c.name}
                                    </Link>
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default CoinList;