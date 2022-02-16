import React, { Component } from "react";
import { Route, Switch, Redirect} from "react-router-dom";
import Coin from "./Coin";
import CoinList from "./CoinList";

class Routes extends Component{
    render(){
        const getCoin = props => {
            let name = props.match.params.name;
            let currentCoin = this.props.coins.find(
              coin => coin.name.toLowerCase() === name.toLowerCase()
            );
            return <Coin {...props} coin={currentCoin}/>
          };
        return(
            <Switch>
                <Route exact path='/coins' render={() => <CoinList coins={this.props.coins}/> } 
                />
                <Route exact path='/coins/:name' render={getCoin}/>
                <Redirect to='/coins' />
            </Switch> 
        );
    }
}

export default Routes;