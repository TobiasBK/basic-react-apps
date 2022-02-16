import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./Coin.css";


class Coin extends Component {
    render(){
        let {coin} = this.props; //for ease w markup 
        return(
            <div className="Coin row justify-content-center my-5">
                <div className="col-11 col-lg-5">
                    <div className="Coin-card card">
                        <img className= "card-img-top"src={coin.src} alt={coin.name}/>
                        <div className="card-body">
                            <h2 className="card-title">{coin.name}</h2>
                            <h4 className="card-subtitle text-muted">
                                Since {coin.age} 
                            </h4>
                            </div>
                                <ul className="list-group list-group-flush">
                                    {coin.facts.map((fact,i) => (
                                        <li className="list-group-item" key={i}>
                                            {fact}
                                        </li>
                                    ))}
                                </ul>
                                <div className="card-body">
                                    <Link to="/coins" className="btn btn-info">Go Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
        )
    }
}

export default Coin;