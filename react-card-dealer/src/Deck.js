import React, { Component } from "react";
import Card from "./Card.js";
import "./Deck.css";
import axios from "axios";


const BASE_API_URL = "https://www.deckofcardsapi.com/api/deck"

class Deck extends Component {
    constructor(props){
        super(props);
        this.state = {deck: null, drawn: []};
        this.getCard = this.getCard.bind(this);
    }
    async componentDidMount(){
        let deck = await axios.get(`${BASE_API_URL}/new/shuffle/`); //all code after this will wait for this to finish
        this.setState({deck: deck.data})
    }
    async getCard(){
        //make request using the deck ID
         //set state w new data
        let deck_id = this.state.deck.deck_id;
        try {
            let cardURL = `${BASE_API_URL}/${deck_id}/draw`;
            let cardResponse = await axios.get(cardURL);
            if (!cardResponse.data.success){
                throw new Error("No Cards Left!");
            }
            let card = cardResponse.data.cards[0];
            console.log(cardResponse.data);
            //set new state by calling old array
            this.setState(st => ({
                drawn: [
                    ...st.drawn,
                    {
                        id: card.code,
                        image: card.image,
                        name: `${card.value} of ${card.suit}`
                    }   
                ]
            }));
        } catch(err){
            alert(err);
        }
    }
    render(){
        const cards = this.state.drawn.map(c => (
            <Card id ={c.id} name={c.name} image={c.image} />
        ));
        return(
            <div className="Deck">
                <h1 className="Deck-title">Card Dealer</h1>
                <button className="Deck-btn" onClick = {this.getCard}>Pick A Card</button>
                <div className="Deck-cardarea">{cards}</div>
            </div>
        )
    }
}

export default Deck;